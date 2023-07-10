import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import ModalPop from '../modal/ModalPop';
import { Modal } from 'react-bootstrap';
import CalendarContentAdd from './CalendarContentAdd';
import { AuthLoginErr, CommonPostAxios } from '../Common';
import eventBus from '../../eventBus';
import CalendarContentEdit from './CalendarContentEdit';

export default function MainCalendar() {
  const calendarRef = useRef(null);
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [modalFormState, setModalFormState] = useState({
    open: false,
    message: '',
    title: '',
    callback: null
  });
  const [calendarContentState, setCalendarContentState] = useState(false);
  const [calendarContentEditState, setCalendarContentEditState] = useState(false);
  const [initialEvents, setInitialEvents] = useState([]);

  const [calendarId, setCalendarId] = useState('');
  const [calendarContentId, setCalendarContentId] = useState('');

  const [forceUpdate, setForceUpdate] = useState('');

  const handleDateSelect = (selectInfo) => {
    setCalendarContentState(true);
    setForceUpdate('Y');
  };

  const popEvent = (i) => {
    if(i) {
        setCalendarContentState(false);
        setCalendarContentEditState(false);
        setForceUpdate(prev => prev + ' ');
    } 
  }

  const handleEventClick = (clickInfo) => {
    const clickedEventId = clickInfo.event.id; // 클릭한 이벤트의 ID
    const clickedEvent = initialEvents.find(event => event.id === clickedEventId); // 클릭한 이벤트 찾기
    console.log(clickedEvent.id);
    setCalendarContentId(clickedEvent.id);
    setCalendarContentEditState(true);
    setForceUpdate('Y');
  };

  useEffect(() => {

    const handleDataReceived = (receivedData) => {
      setCalendarId(receivedData);
    };
    
    eventBus.on('calendarId', handleDataReceived);

    return () => {
      eventBus.off('calendarId', handleDataReceived);
    };

  }, []);
  
  useEffect(() => {
    console.log("forceUpdate : ",forceUpdate);
    const param = {
      calendarId : calendarId
    }

    const postData = async () => {
      try {
        CommonPostAxios('/calendar/content/findAll', param, callbackSetData);
      } catch (error) {
        AuthLoginErr(error);
      }
    };
    postData();
  }, [calendarId, forceUpdate]);

  const callbackSetData = (data) => {
    
    const formattedEvents = data.map((item) => ({
      id: item.calendarContentId,
      title: item.title,
      start: item.startTime === null ? item.startDt : item.startDt + 'T' + item.startTime,
      end: item.endTime === null ? item.endDt : item.endDt + 'T' + item.endTime
    }));
    setInitialEvents(formattedEvents);
  };

  const eventContent = ({ event }) => {

    return (
        <div className="fc-event-time" style={{textAlign : 'center'}}>
          {/* <div className="fc-event-time">{startTime} - {endTime}</div> */}
          <div className="fc-event-title">{event.title}</div>
        </div>
        
    );
  };
  
  useEffect(() => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.removeAllEvents();
    if (initialEvents.length > 0) {
      initialEvents.forEach((event) => {
        calendarApi.addEvent(event);
      });
    }
  }, [initialEvents]);

  return (
    <>
    <div className='demo-app'>
      <div className='calendar-main'>
        <ModalPop
          open={modalFormState.open}
          setPopup={setModalFormState}
          message={modalFormState.message}
          title={modalFormState.title}
          callback={modalFormState.callback}
        />
        <Modal show={calendarContentState} onHide={() => {setCalendarContentState(false);}}>
          <CalendarContentAdd popEvent={popEvent} calendarId={calendarId}/>
        </Modal>
        <Modal show={calendarContentEditState} onHide={() => {setCalendarContentEditState(false);}}>
          <CalendarContentEdit popEvent={popEvent} calendarId={calendarId} calendarContentId={calendarContentId}/>
        </Modal>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}
          themeSystem="bootstrap5"
          headerToolbar={{
            left: 'prevYear,prev,next,nextYear',
            center: 'title',
            right: 'today dayGridMonth,timeGridWeek,timeGridDay'
          }}
          buttonIcons={{
            prev: 'chevron-left',
            next: 'chevron-right',
            prevYear: 'chevron-double-left', // double chevron
            nextYear: 'chevron-double-right', // double chevron
            today: 'bi bi-calendar-heart',
            dayGridMonth: 'calendar-month',
            timeGridWeek: 'calendar-week',
            timeGridDay: 'calendar-day'
          }}
          initialView='dayGridMonth'
          height="600px"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={initialEvents}
          select={handleDateSelect}
          eventClick={handleEventClick}
          titleFormat={(date) => {
            return date.date.year + "년 " + (date.date.month + 1) + "월";
          }}
          dayHeaderContent={(date) => {
            let weekList = ['일', '월', '화', '수', '목', '금', '토'];
            return weekList[date.dow];
          }}
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: false
          }}
          eventContent={eventContent}
          slotLabelFormat={{
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: false,
            meridiem: false
          }}
          slotLabelInterval={{
            hours: 1
          }}
        />
      </div>
    </div>
    </>
  );
}
