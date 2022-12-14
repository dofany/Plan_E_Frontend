import React, {useState} from 'react';

// import momentPlugin from '@fullcalendar/moment';

import FullCalendar, {formatDate} from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from '../../pages/event-utils';
import {Menu, MenuItem, ProSidebar, SidebarContent, SubMenu} from "react-pro-sidebar";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import LeftMenu from '../../common/component/menu/LeftMenu'



export default class MainCalendar extends React.Component {

    state = {
        weekendsVisible: true,
        currentEvents: []
    }

    render() {
        return (
            <div className='demo-app'>
                {/*{<Layout></Layout>}*/}
                {<LeftMenu></LeftMenu>}
                <div className='calendar-main'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrap5Plugin]}
                        themeSystem="bootstrap5"
                        // customButtons={{
                        //     myCustomButton: {
                        //         text: 'custom!',
                        //         icon: 'MdOutlineCalendarToday',
                        //         click: function () {
                        //             alert('clicked the custom button!');
                        //         },
                        //     },
                        // }}
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
                        // locale="ko"
                        initialView='dayGridMonth'
                        height="100%"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        weekends={this.state.weekendsVisible}
                        initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                        select={this.handleDateSelect}
                        eventContent={renderEventContent} // custom render function
                        eventClick={this.handleEventClick}
                        eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                        // eventBackgroundColor="#ff0000"
                        // titleFormat='dddd, MMMM D, YYYY'
                        titleFormat={(date) => { // title 설정
                            return date.date.year +"년 "+(date.date.month +1)+"월";
                        }}
                        dayHeaderContent={(date)=> {
                            let weekList = ['일','월','화','수','목','금','토'];
                            return weekList[date.dow];
                            // 헤더 var weekList = ['일','월','화','수','목','금','토'];
                        }}
                        // eventBorderColor='#5c6a96'
                        // titleFormat={ // will produce something like "Tuesday, September 18, 2018"
                        // {
                        //   month: 'long',
                        //   // year: 'numeric',
                        //   // day: 'numeric',
                        //   // weekday: 'long',
                        //   // omitCommas: 'false'
                        // }}
                        // dayHeaderFormat={
                        //   {
                        //     weekday: 'short',
                        //     // month: 'numeric',
                        //     // day: 'numeric',
                        //     // omitCommas: true
                        //   }
                        // }
                        // dayHeaderContent= {(date) => {
                        //   let weekList = ["일", "월", "화", "수", "목", "금", "토"];
                        //   console.log(weekList[date.dow]);
                        //   return weekList[date.dow];
                        // }}
                        /* you can update a remote database when these fire:
                        eventAdd={function(){}}
                        eventChange={function(){}}
                        eventRemove={function(){}}
                        */
                    />
                </div>
            </div>
        )
    }

    renderSidebar() {

        return (
            <div style={{ display: 'flex', height: '100%' }}>
                <div>
                    {/* small and big change using menucollapse state */}
                    <h2>Big Logo</h2>
                </div>
                <ProSidebar>
                    <SidebarContent>
                        <LeftMenu renderExpandIcon={({ open }) => <span>{open ? '-' : '+'}</span>}>
                            <SubMenu label="Charts">
                                <MenuItem> Pie charts</MenuItem>
                                <MenuItem> Line charts</MenuItem>
                                <MenuItem> Bar charts</MenuItem>
                            </SubMenu>
                            <MenuItem> Calendar</MenuItem>
                            <MenuItem> E-commerce</MenuItem>
                            <MenuItem> Examples</MenuItem>
                        </LeftMenu>
                    </SidebarContent>
                    <main>
                        {/*<button onClick={() => collapseSidebar()}>Collapse</button>*/}
                    </main>
                </ProSidebar>
            </div>
            // <div className='demo-app-sidebar'>
            //   <div className='demo-app-sidebar-section'>
            //     <h2>정보</h2>
            //     <ul>
            //       <li>날짜를 선택하면 새 이벤트를 생성하라는 메시지가 표시됩니다.</li>
            //       <li>이벤트 드래그, 드롭 및 크기 조정</li>
            //       <li>이벤트를 삭제하려면 클릭하세요.</li>
            //     </ul>
            //   </div>
            //   <div className='demo-app-sidebar-section'>
            //     <h2>모든 일정 ({this.state.currentEvents.length})</h2>
            //     <ul>
            //       {this.state.currentEvents.map(renderSidebarEvent)}
            //     </ul>
            //   </div>
            // </div>
        )
    }

    handleWeekendsToggle = () => {
        this.setState({
            weekendsVisible: !this.state.weekendsVisible
        })
    }

    handleDateSelect = (selectInfo) => {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }
    }

    handleEventClick = (clickInfo) => {
        // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        //     clickInfo.event.remove();
        // }
    }

    handleEvents = (events) => {
        this.setState({
            currentEvents: events
        })
    }

}

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    )
}

function renderSidebarEvent(event) {
    return (
        <li key={event.id}>
            <b>{formatDate(event.start, {year: 'numeric',
                month: 'short',
                day: 'numeric',
                // timeZoneName: 'short',
                // timeZone: 'UTC',
                locale: 'ko'})}</b>
            <i>{event.title}</i>
        </li>
    )
}
