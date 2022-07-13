import { useState, useEffect } from "react";

function Content ({isAuthorized}) {
    const [data, setData] = useState({});
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(process.env.REACT_APP_JSON_ENDPOINT)
            const result = await response.json()
            console.log(result)
            setData(result)
        }
        getData()
    },[])
    console.log(data)
    return (
        <>
        { isAuthorized ? (
            <>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <p>{data.body}</p>
            <img className="image" src={data.image} alt="" />
            </>
        ): (
            <h1>Sorry you do not own the NFT required</h1>
        )}
        </>
    )
}

export default Content;
