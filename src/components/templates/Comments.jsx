import { useState, useContext } from 'react';
import { API_URL } from '../../constants/env';
import { UserContex } from '../../context/userContext';
import { getToken } from '../../helpers/auth';
import ErrorMessage from '../../helpers/messageError';

const Comment = ({ name, content, date }) => (
    <div className="border border-gray-300 rounded-lg px-4 py-3 mb-4 relative">
        <p className="text-gray-500 text-xs absolute left-3/4">{date}</p>
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-gray-700 text-base my-2 ml-4">{content}</p>
    </div>
);

const CommentForm = ({ onSubmit }) => {
    const { state } = useContext(UserContex);
    const [content, setContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = state.user.name.split(' ').slice(0, 2).join(' ');
        onSubmit({ name, content });
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit} className={'flex items-center justify-between'}>
            <div className="mb-4 w-full px-2">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor="comment">
                    Comentario
                </label>
                <textarea
                    className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500"
                    id="comment"
                    value={content}
                    placeholder="your comment..."
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Enviar
            </button>
        </form>
    );
};

const Comments = ({ idPublication, commentsPublication }) => {
    const [comments, setComments] = useState(commentsPublication);

    const handleCommentSubmit = async (comment) => {
        const response = await fetch(`${API_URL}v1/product/comment`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `bearer ${getToken()}`
            },
            body: JSON.stringify({ idProduct: idPublication, name: comment.name, content: comment.content, date: new Date().toLocaleString() })
        });

        const responseBody = await response.json();
        if (!responseBody.acknowledged) return ErrorMessage('Agregar un comentario', 'No se guardo tu comentario');
        setComments([...comments, { ...comment, date: new Date().toLocaleString() }]);
    };

    return (
        <div className="max-w-2xl mt-14">
            <div className='my-8'>
                <h2 className="text-xl font-medium mb-4">Comentarios</h2>
                {comments.map((comment, index) => (
                    <Comment key={index} {...comment} />
                ))}
            </div>
            <div className='my-12'>
                <h3 className="text-lg font-normal mb-4">Haz un comentario</h3>
                <CommentForm onSubmit={handleCommentSubmit} />
            </div>
        </div>
    );
};

export default Comments;