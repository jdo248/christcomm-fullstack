import { useEffect, useState } from "react"

const Subjects = () =>{
    const [subject , setSubject] = useState("")
    useEffect(() => {
        const subject = window.location.pathname.split("/")[2]
        setSubject(subject.replace(/%20/g, " "))
    }
    , [])

    return (
        <div>
            <h1>{subject}</h1>
        </div>
    )
    
}
export default Subjects;