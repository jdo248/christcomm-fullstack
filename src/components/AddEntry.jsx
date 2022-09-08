import { useState } from "react";

const AddEntry = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    
    const handleContentChange = (event) => {
        setContent(event.target.value);
    };
    
    const handleTagsChange = (event) => {
        setTags(event.target.value);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newEntry = {
        subject: title,
        content: content,
        topic: [{value: tags}],
        creator : { user: JSON.parse(localStorage.getItem("user")) }
        };
        if (newEntry.subject === "" ){
            alert("Please enter the title.")
            window.location.reload()
        }
        if (newEntry.content === "" ){
            alert("Please enter some content.")
            window.location.reload()
        }
        if (newEntry.topic === "" ){
            alert("Please select a topic.")
            window.location.reload()
        }
          
       const addRes = await fetch("/api/createThread/" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
        });
        const response = await addRes.json();
        console.log(response);
    };
       
    const  TAGS_OPT = [
        {"1": "BSC PM"},
        {"2": "BSC CSM"},
        {"3": "BCOM"},
        {"4": "BBA"},
        {"5": "BCA"},
        {"6": "BA JPE"},
        {"7": "BSC PSY CS"},
        {"8": " BSC CM"}
    ]

    return (
        <div className="add-entry">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <h5 className="mt-3" htmlFor="title">Title</h5>
                    <input type="text" required className="form-control" id="title" aria-describedby="titleHelp" placeholder="Enter title" value={title} onChange={handleTitleChange} />
                    <small id="titleHelp" className="form-text text-muted">Enter a title for your entry.</small>
                </div>
                <div className="form-group">
                    <h5 className="mt-3" htmlFor="content">Add something helpful </h5>
                    <textarea className="form-control" id="content" rows="3" required value={content} onChange={handleContentChange}></textarea>
                </div>
                <div className="form-group">
                    <h5 className="mt-3" htmlFor="tags">Tag</h5>
                    <select className="form-control" id="tags" required value={tags} onChange={handleTagsChange}>
                        {TAGS_OPT.map((tag, index) => {
                            return (
                                <option key={index} value={Object.keys(tag)[0]}>{Object.values(tag)[0]}</option>
                            );
                        })}
                    </select>
                    <small id="tagsHelp" className="form-text text-muted">Select tag for your entry.</small>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    );
};

export default AddEntry;