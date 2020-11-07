import React from 'react'
import { List } from 'semantic-ui-react'
import { Link } from "react-router-dom";
const dateFormatTutorials = (date) => {
    let d = date.split("T")
    let dateFull = d[0].split("-")
    let monthNames = [ {1: "Ene.", 2: "Feb.", 3: "Mar.", 4: "Abr.", 5: "May.", 6: "Jun.",
    7: "Jul.", 8: "Ago.", 9: "Sep.", 10: "Oct.", 11: "Nov.", 12: "Dic." }];
    let dateTutorials = `${dateFull[2]} ${monthNames[0][dateFull[1]]} ${dateFull[0]}`
    return dateTutorials
}
const Alltutorials = ({ arrayTutorials }) => {
    return(
        <List celled>
        {arrayTutorials.map((value, index) => (
                <List.Item key={index}>
                    <Link to={`/detail/${value.id}`}>
                        <List.Content>
                            <span style={{float:'right'}}>{dateFormatTutorials(value.fecha)}</span>
                            <List.Header>{value.nombre}</List.Header>
                            {value.profesor}
                        </List.Content>
                    </Link>
                </List.Item>
        ))}
    </List>
    )
}

export default Alltutorials