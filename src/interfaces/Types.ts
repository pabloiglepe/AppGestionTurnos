
export interface Turnos {
    id: number;
    title: string;
    inicio: Date;
    fin: Date;
}

export interface EstadoModal {
    estaAbirto: boolean;
    fecha: Date | null;
}