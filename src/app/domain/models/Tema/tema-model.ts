export interface TemaModel {
    id: string;
    tema: string;
    orden: string;
    estado: boolean;
    promedio: number;
}

export class TemaConvert {
    public static toWelcome(json: string): TemaModel[] {
        return JSON.parse(json);
    }

    public static welcomeToJson(value: TemaModel[]): string {
        return JSON.stringify(value);
    }

    public static fromObjectToJson(value: TemaModel): JSON {
        return JSON.parse(JSON.stringify(value))
    }
}