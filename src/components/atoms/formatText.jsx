const FormatText = ({ text, limit }) => {

    if (!limit) return (
        <div>
            {text.split('\n').map((string, i) => <p key={i}>{string}</p>)}
        </div>
    );

    return (
        <div>
            {text.split('\n').map((string, i) => i < limit && <p key={i}>{string}</p>)}
            ...
        </div>
    );
}
export default FormatText