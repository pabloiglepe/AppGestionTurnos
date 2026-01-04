import { useState } from 'react';
import { Calendar, dayjsLocalizer, type SlotInfo } from 'react-big-calendar';
import dayjs from 'dayjs'
import 'dayjs/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { EstadoModal, Turnos } from '../interfaces/Types';


// Localizador Day.js
dayjs.locale('es');
const localizer = dayjsLocalizer(dayjs);


function MyCalendar() {
    
    // Estado para los Turnos
    const [turnos, setTurnos] = useState<Turnos[]>([])

    // Estado para el Modal
    const [modal, setModal] = useState<EstadoModal>({
        estaAbirto: false,
        fecha: null
    });

    // Estados para los inputs del formulario
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');


    const cambiarHoraInicio = (valor: string) => {
        setHoraInicio(valor);

        const nuevaHoraFin = dayjs(`2025-01-01T${valor}`).add(3, 'hour').format('HH:mm');

        setHoraFin(nuevaHoraFin);
    }

    const manejadorSlot = ({ start }: SlotInfo) => {

        const momentoActual = dayjs().format('HH:mm');

        const tresHorasDespues = dayjs().add(3, 'hour').format('HH:mm');

        setHoraInicio(momentoActual);
        setHoraFin(tresHorasDespues);

        setModal({
            estaAbirto: true,
            fecha: start
        })
    };

    const guardarTurno = () => {

        if (modal.fecha) {

            const fechaBase = dayjs(modal.fecha).format('YYYY-MM-DD');
            const inicio = dayjs(`${fechaBase}T${horaInicio}`);
            const fin = dayjs(`${fechaBase}T${horaFin}`);

            const nuevoTurno: Turnos = {
                id: Math.random(),
                title: `${inicio.format('H:mm')} - ${fin.format('H:mm')}`,
                inicio: inicio.toDate(),
                fin: fin.toDate(),
            };

            setTurnos([...turnos, nuevoTurno]);
            setModal({ estaAbirto: false, fecha: null });
        }
    }

    return (
        <>
            <div style={{ margin: 'auto', width: '80%', height: '80vh' }}>
                <Calendar
                    localizer={localizer}
                    events={turnos}
                    selectable
                    startAccessor="inicio"
                    endAccessor="fin"
                    onSelectSlot={manejadorSlot}
                    messages={{
                        allDay: 'Todo el día',
                        previous: 'Anterior',
                        next: 'Siguiente',
                        today: 'Hoy',
                        month: 'Mes',
                        week: 'Semana',
                        day: 'Día',
                        agenda: 'Agenda',
                        date: 'Fecha',
                        time: 'Hora',
                        event: 'Evento',
                        noEventsInRange: 'No hay turnos en este rango',
                    }}
                    defaultView="month"
                />

                {modal.estaAbirto && (
                    <div style={modalOverlayStyle}>
                        <div style={modalContentStyle}>
                            <h3 style={{ textAlign: 'center' }}>Registrar Turno</h3>
                            <h4 style={{ textAlign: 'center' }}>{dayjs(modal.fecha).format('D [de] MMMM')}</h4>

                            <div style={inputGroupStyle}>
                                <label htmlFor="horaEntrada">Hora Entrada: </label>
                                <input name='horaEntrada' type="time" value={horaInicio} onChange={(e) => cambiarHoraInicio(e.target.value)} />
                            </div>


                            <div style={inputGroupStyle}>
                                <label htmlFor="horaSalida">Hora Salida:</label>
                                <input name='horaSalida' type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} />
                            </div>

                            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                                <button onClick={guardarTurno} style={btnSaveStyle}>Guardar Turno</button>
                                <button onClick={() => setModal({ estaAbirto: false, fecha: null })} style={btnCancelStyle}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

// ESTILOS
const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
};

const modalContentStyle: React.CSSProperties = {
    backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '300px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
};

const inputGroupStyle: React.CSSProperties = {
    marginBottom: '15px', display: 'flex', flexDirection: 'column'
};

const btnSaveStyle = { backgroundColor: '#2563eb', color: 'white', padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer', flex: 1 };
const btnCancelStyle = { backgroundColor: '#94a3b8', color: 'white', padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer', flex: 1 };

export default MyCalendar;
