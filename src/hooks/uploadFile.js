const evtFile = async (File) => {
    const formData = new FormData();
    for (let i = 0; i < File.length; i++) {
        formData.append('file', File[i], File[i].name);
    }

    try {
        const query = await fetch('https://sapimg.fly.dev/api.sammy.imge/upload', {
            method: 'POST',
            body: formData,
            redirect: "follow"
        });
        const res = await query.json();
        return res;
    } catch (error) {
        console.log(error);
    }
}

export default evtFile;