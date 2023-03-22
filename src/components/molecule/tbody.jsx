const TbodyCaracteristicas = ({ Caracteristica, value }) => {
    return (
        <tbody>
            <tr>
                <th className="px-3 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{Caracteristica}</th>
                <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">{value}</td>
            </tr>
        </tbody>
    );
}

export default TbodyCaracteristicas;