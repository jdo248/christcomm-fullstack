const Fees = () =>{

    const feesData =[
        {
            course:"B.A - J.P.(Journalism, Psychology)",
            fees:40000,

        },
        {
            course:"B.A - P.E.(Psychology, English)",
            fees:40000,

        },
        {
            course:"B.B.A.",
            fees:70000,

        },
        {
            course:"B.B.A. (Business Analytics)",
            fees:85000,

        },
        {
            course:"B.C.A",
            fees:70000,

        },
        {
            course:"B.C.A (Industrial Specialization)",
            fees:90000,

        },
        {
            course:"B.Com",
            fees:60000,

        },
        {
            course:"B.Com - Professional ACCA / CA",
            fees:80000,

        },
        {
            course:"B.Com - (Financial Analytics)",
            fees:75000,

        },
        {
            course:"B.Sc - MCs (Mathematics, Computer Science)",
            fees:45000,

        },
        {
            course:"B.Sc - PCs (Psychology, Computer Science)",
            fees:45000,

        },
        {
            course:"B.Sc - CM (Chemistry, Mathematics)",
            fees:40000,

        },
        {
            course:"B.Sc -PM (Physics, Mathematics)",
            fees:40000,

        },
        {
            course:"M.A. - English",
            fees:40000,

        },
        {
            course:"M.B.A.",
            fees:250000,

        },
        {
            course:"M.Com",
            fees:60000,

        },
        {
            course:"M.Sc. (Psychology)",
            fees:60000,

        },
    ]

    return(
     <div>
       <h1>Fees</h1>
       <table className="table table-striped p-2 mt-2">
              <thead>
                <tr>
                    <th scope="col">Course</th>
                    <th scope="col">Fees</th>
                </tr>
                </thead>
                <tbody>
                    {feesData.map((fees,index)=>{
                        return(
                            <tr key={index}>
                                <td 
                                className="text-capitalize fw-semibold"
                                >{fees.course}</td>
                                <td
                                className="fw-bold"
                                >{fees.fees}</td>
                            </tr>
                        )
                    }
                    )}
                </tbody>

       </table>
     </div>
    )
}

export default Fees