export interface PreguntaModel {
    id: string;
    idSubTema: string;
    idTema:string,
    indice: string;
    pregunta: string;
    descripcion: string;
    alternativas: any;
    elementos: any;
    respuesta: string;
    estado: boolean;
    tipoPregunta:string;
}

export interface AlternativaPreguntaModel {
    id: string;
    correcta: string;
    posicion: string;
    valor: string;
}

export interface ElementosPreguntaModel {
    id: string;
    posicion: string;
    tipoElemento: string;
    valor: any;
}

export class PreguntaConvert {
    public static toWelcome(json: string): PreguntaModel[] {
        return JSON.parse(json);
    }

    public static welcomeToJson(value: PreguntaModel[]): string {
        return JSON.stringify(value);
    }

    public static fromObjectToJson(value: PreguntaModel): JSON {
        return JSON.parse(JSON.stringify(value))
    }
}