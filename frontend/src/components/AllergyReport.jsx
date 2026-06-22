export default function AllergyReport({ allergy_report }) {
  if (!allergy_report || allergy_report.length === 0) return null

  const severityStyles = {
    SAFE: 'bg-green-100 text-green-700',
    CAUTION: 'bg-yellow-100 text-yellow-700',
    AVOID: 'bg-red-100 text-red-700'
  }
  const severityEmoji = {
    SAFE: '🟢',
    CAUTION: '🟡',
    AVOID: '🔴'
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Allergy & Medical Risk Report</h2>
      {allergy_report.map(veg => (
        <div key={veg.vegetable_id} className="bg-white rounded-lg shadow-md p-5 mb-4">
          <h3 className="text-lg font-bold text-gray-800 mb-3">{veg.vegetable_name}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left font-semibold text-gray-600">Group</th>
                  <th className="p-2 text-left font-semibold text-gray-600">Status</th>
                  <th className="p-2 text-left font-semibold text-gray-600">Reason</th>
                </tr>
              </thead>
              <tbody>
                {veg.risk_groups?.map((g, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-2 text-gray-700">{g.group}</td>
                    <td className="p-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${severityStyles[g.severity] || 'bg-gray-100'}`}>
                        {severityEmoji[g.severity] || '⚪'} {g.severity}
                      </span>
                    </td>
                    <td className="p-2 text-gray-600 text-xs">{g.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}
