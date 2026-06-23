import sys, json, os, base64
from datetime import datetime, timedelta
sys.path.insert(0, '/home/FaizBasha05/RecipeX/backend')
# Set GROQ_API_KEY as environment variable on PythonAnywhere via Web tab -> Environment variables
# or uncomment the line below with your actual key:
# os.environ['GROQ_API_KEY'] = 'your-key-here'
from services.demo_data import DEMO_DATA
from services.groq_service import analyze_image
from database import SessionLocal, init_db
from models.user import User
from passlib.context import CryptContext
from jose import jwt, JWTError
pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
SECRET_KEY = os.getenv('JWT_SECRET', 'super-secret-key-change-this')
ALGORITHM = os.getenv('ALGORITHM', 'HS256')
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', '60'))
init_db()

def jr(s, d, st='200 OK'):
    r = json.dumps(d).encode()
    h = [('Content-type', 'application/json'), ('Access-Control-Allow-Origin', '*'), ('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'), ('Access-Control-Allow-Headers', '*')]
    s(st, h); return [r]

def rb(e):
    try: return json.loads(e['wsgi.input'].read(int(e.get('CONTENT_LENGTH',0))).decode())
    except: return None

def reg(b):
    if not b or not b.get('username') or not b.get('password'): return {'error': 'Username and password required'}
    db = SessionLocal()
    try:
        if db.query(User).filter((User.username == b['username']) | (User.email == b.get('email',''))).first():
            return {'error': 'Username or email already exists'}
        u = User(username=b['username'], email=b.get('email',''), hashed_password=pwd_context.hash(b['password']), full_name=b.get('full_name',''), age=b.get('age',0))
        db.add(u); db.commit(); db.refresh(u)
        return {'message': 'User created', 'user_id': u.id}
    finally: db.close()

def log(b):
    if not b or not b.get('username') or not b.get('password'): return {'error': 'Username and password required'}
    db = SessionLocal()
    try:
        u = db.query(User).filter(User.username == b['username']).first()
        if not u or not pwd_context.verify(b['password'], u.hashed_password): return {'error': 'Invalid credentials'}
        t = jwt.encode({'sub': str(u.id), 'exp': datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)}, SECRET_KEY, algorithm=ALGORITHM)
        return {'access_token': t, 'token_type': 'bearer', 'user_id': u.id}
    finally: db.close()

def me(a):
    if not a or not a.startswith('Bearer '): return {'error': 'Not authenticated'}, 401
    try:
        p = jwt.decode(a.split(' ')[1], SECRET_KEY, algorithms=[ALGORITHM])
        uid = int(p.get('sub'))
    except: return {'error': 'Invalid token'}, 401
    db = SessionLocal()
    try:
        u = db.query(User).filter(User.id == uid).first()
        if not u: return {'error': 'User not found'}, 401
        return {'id': u.id, 'username': u.username, 'email': u.email, 'full_name': u.full_name or '', 'age': u.age or 0, 'allergies': u.allergies or '', 'medical_conditions': u.medical_conditions or '', 'dietary_preferences': u.dietary_preferences or '', 'created_at': str(u.created_at) if u.created_at else ''}, 200
    finally: db.close()

def application(environ, start_response):
    p = environ.get('PATH_INFO','').rstrip('/')
    m = environ.get('REQUEST_METHOD','GET')
    if m == 'OPTIONS':
        start_response('200 OK', [('Access-Control-Allow-Origin','*'),('Access-Control-Allow-Methods','GET, POST, OPTIONS'),('Access-Control-Allow-Headers','*')])
        return [b'']
    if p == '/auth/register' and m == 'POST': return jr(start_response, reg(rb(environ)))
    if p == '/auth/login' and m == 'POST': return jr(start_response, log(rb(environ)))
    if p == '/auth/me' and m == 'GET':
        d, s = me(environ.get('HTTP_AUTHORIZATION',''))
        return jr(start_response, d, '401 Unauthorized' if s == 401 else '200 OK')
    if p == '/scan' and m == 'POST':
        try:
            b = rb(environ)
            b64 = b.get('image','') if b else ''
            if b64: d = {'scan_id': 1, 'result': analyze_image(base64.b64decode(b64))}
            else: d = {'error': 'No image'}
        except Exception as e: d = {'error': str(e)}
        return jr(start_response, d)
    routes = {'/health': lambda: {'status': 'healthy'}, '': lambda: {'app': 'Recipe_x AI', 'status': 'running', 'version': '1.0.0'}, '/scan/demo': lambda: {'scan_id': 1, 'result': DEMO_DATA}}
    h = routes.get(p)
    if not h: return jr(start_response, {'error': 'Not found'}, '404 Not Found')
    return jr(start_response, h())
