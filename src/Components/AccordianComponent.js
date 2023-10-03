import moment from 'moment';
import React from 'react'
import { Table } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import Style from '../Styles/AccordianComponent.module.css'

function AccordianComponent({ eventname, sdate, edate, img, address, ticket, index, about, eventProducer }) {
    const thCells = [
        "Name",
        "Price",
        "Start Date",
        "End Date",
        "Payment Link"
    ];
    return (
        <>

            <Accordion.Item eventKey={index} className={Style.accordionitem} >
                <Accordion.Header>
                    <div className={Style.accordionheaderdiv}>
                        <h4 className={Style.h4}>{eventname}</h4>
                        <p className={Style.p}>{moment(sdate).format("Do MMMM YYYY h:mmA")}</p>
                    </div>
                </Accordion.Header>
                <Accordion.Body>
                    <div className={Style.accordionbodydiv}>
                        <img src={img} alt="Eventpicture" className={Style.imgtag} />
                        <div style={{ flexGrow: "1" }}>
                            <li className={Style.li}>End-date : {moment(edate).format("Do MMMM YYYY")}</li>
                            <li className={Style.li}>Full-address : {address}</li>
                            <li className={Style.li}>About : {about}</li>
                            <li className={Style.li}>Event-producer : {eventProducer.first_name + " " + eventProducer.last_name}</li>
                        </div>
                    </div>
                    <div className={Style.tableMaindiv}>
                        <h4>Ticket Details</h4>
                        <Table striped bordered hover responsive className={Style.table}>
                            <thead>
                                <tr>
                                    {thCells.map((cell, cellIndex) => (
                                        <th key={cellIndex} className={Style.th}>
                                            {cell}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {ticket.map((ticket, ticketIndex) => {
                                    const {
                                        name,
                                        price,
                                        start_date,
                                        end_date,
                                        ticket_purchase_link
                                    } = ticket;

                                    const formattedStartDate = moment(start_date).format("Do MMMM YYYY");
                                    const formattedEndDate = moment(end_date).format("Do MMMM YYYY");

                                    return (
                                        <tr key={ticketIndex}>
                                            <td className={Style.td}>{name}</td>
                                            <td className={Style.td}>{price}</td>
                                            <td className={Style.td}>{formattedStartDate}</td>
                                            <td className={Style.td}>{formattedEndDate}</td>
                                            <td className={Style.td}><Link to={ticket_purchase_link ? ticket_purchase_link : ""} target='blank'>Pay</Link></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                </Accordion.Body>
            </Accordion.Item>

        </>
    )
}

export default AccordianComponent
