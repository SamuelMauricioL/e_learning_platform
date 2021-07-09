export interface SubTemaModel {
    id: string;
    idTema: string;
    subtema: string;
    estado: boolean;
}

export class TemaConvert {
    public static toWelcome(json: string): SubTemaModel[] {
        return JSON.parse(json);
    }

    public static welcomeToJson(value: SubTemaModel[]): string {
        return JSON.stringify(value);
    }

    public static fromObjectToJson(value: SubTemaModel): JSON {
        return JSON.parse(JSON.stringify(value))
    }
}