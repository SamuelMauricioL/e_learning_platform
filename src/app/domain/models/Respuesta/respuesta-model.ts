export interface RespuestaModel {
    id: string;
    idAlumno: string;
    idTema: string;
    identificador: string;
    promedio: string;
    ruta: string;
    tiempo: string;
    estado: boolean;
}

export interface IntentoModel {
    id: string;
    idTema: string;
    fecha: string;
    intencion: string;
    tipoIntento: string;
    subtemas: any;
}

export class RespuestaConvert {
    public static toWelcome(json: string): RespuestaModel[] {
        return JSON.parse(json);
    }

    public static welcomeToJson(value: RespuestaModel[]): string {
        return JSON.stringify(value);
    }

    public static fromObjectToJson(value: RespuestaModel): JSON {
        return JSON.parse(JSON.stringify(value))
    }
}