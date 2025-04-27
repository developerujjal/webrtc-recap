import moment from 'moment'
import { useEffect, useState } from 'react'

const CallInfo = ({apptInfo})=>{

    const [ momentText, setMomentText ] = useState(moment(apptInfo.appDate).fromNow())
    
    useEffect(() => {
        const timeInterval = setInterval(()=>{
            setMomentText(moment(apptInfo.appDate).fromNow())
            // console.log("Updating time")
        },5000);
        
        return () => {
            console.log("Clearing")
          clearInterval(timeInterval);
        };
      }, [apptInfo.appDate]);

    return(
        <div className="call-info">
            <h1>
                {apptInfo.name} has been notified.<br />
                Your appointment is {momentText}.
            </h1>
        </div>
    )
}

export default CallInfo