export interface PreguntaModel {
    id: string;
    idSubTema: string;
    pregunta: string;
    descripcion: string;
    alternativas: string;
    respuesta: string;
    estado: boolean;
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