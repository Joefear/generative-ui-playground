/**
 * ComparisonTable - Protocol comparison table
 *
 * Shows side-by-side comparison of the three generative UI protocols:
 * Static GenUI, MCP Apps, and A2UI.
 */

export function ComparisonTable() {
  return (
    <div className="glass-card">
      <h2 className="text-xl font-semibold mb-4">Protocol Comparison</h2>
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Aspect</th>
            <th>Static GenUI</th>
            <th>MCP Apps</th>
            <th>A2UI</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="font-medium">UI Definition</td>
            <td>React components</td>
            <td>HTML/JS apps</td>
            <td>JSON schema</td>
          </tr>
          <tr>
            <td className="font-medium">Who Controls</td>
            <td>Frontend developer</td>
            <td>MCP server</td>
            <td>AI agent</td>
          </tr>
          <tr>
            <td className="font-medium">Flexibility</td>
            <td>Fixed at build time</td>
            <td>Dynamic per server</td>
            <td>Fully dynamic</td>
          </tr>
          <tr>
            <td className="font-medium">Best For</td>
            <td>Known UI patterns</td>
            <td>Rich interactions</td>
            <td>Generated content</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
