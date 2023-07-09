import React, { useState, useEffect } from "react";
import { useLandmarkEventContext } from "../../contexts/LandmarkEventContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import { useTicketContext } from "../../contexts/TicketContext";

import css from "../LandMarkEvent/LandMarkEvent.module.css";

function LandmarkEvent({ id }) {
  const { landmarkEvents } = useLandmarkEventContext();
  const { tickets } = useTicketContext();
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(id);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const flattenedEvents = landmarkEvents.flat(); // flatten the array

    const filteredEvents = flattenedEvents.filter(
      (event) => event.event.landmark.id === selectedId
    );

    if (filteredEvents.length > 0) {
      setEvent(filteredEvents[0]);
    } else {
      setEvent(null);
    }
  }, [selectedId, landmarkEvents]);

  if (!landmarkEvents || !landmarkEvents.length) {
    return <p>No events found in context</p>;
  }

  if (!event) {
    return <p>No events found for ID: {selectedId}</p>;
  }

  if (!tickets || !tickets.length) {
    return <p>No tickets found in context</p>;
  }

  const ticket = tickets.find(
    (ticket) => ticket.ticket.event.id === event.event.id
  );

  if (!ticket) {
    return <p>No Ticket Avaliable For This Event</p>;
  }

  return (
    <div className={css.body}>
      <div className={css.title1}>
        <h1 className={css.upcoming}>{t("LandmarkEvent.LandMark Event")} </h1>
      </div>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.item_right}>
            <div key={ticket.id}>
              <p className={css.day}>{t("LandmarkEvent.Event Ticket")} </p>
            </div>

            <span className={css.up_border}></span>
          </div>
          <div className={css.item_left}>
            <p className={css.event}>{event.title}</p>
            {/* <h2 className={css.title2}>{event.event.landmark.name}</h2> */}
            <div className={css.sce}>
              <div className={css.icon}>
                <i className="fa fa-clock-o"></i>
              </div>
              <p>
                {" "}
                {t("LandmarkEvent.From")} {event.event.openTime}
                {t("LandmarkEvent.AM")}
                <span>
                  {" "}
                  {t("LandmarkEvent.To")} {event.event.closeTime}
                  {t("LandmarkEvent.PM")}
                </span>
              </p>
            </div>

            <div className={css.fix}></div>
            <div className={css.loc}>
              <div className={css.icon}>
                <div className={css.priceTitle}>
                  <div className={css.iconprice}>
                    <i className="fa fa-money"></i>
                  </div>
                  <p>{t("LandmarkEvent.Ticket Price")}</p>
                </div>
              </div>
              <div className={css.ticketprice}>
                {tickets
                  .filter((ticket) => ticket.ticket.event.id === event.event.id)
                  .map((ticket) => (
                    <div key={ticket.id}>
                      {ticket.ticket_class_category}: {ticket.ticket.price}
                      {t("LandmarkEvent.EG")}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandmarkEvent;
