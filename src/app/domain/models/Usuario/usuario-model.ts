export interface UsuarioModel {
    id: string;
    codigo: string;
    email: string;
    contraseña: string;
    estado:     boolean;
    grado:      string;
    nombre:     string;
    rol:        string;
    roles:any;
}

export class UsuarioConvert {
    public static toWelcome(json: string): UsuarioModel[] {
        return JSON.parse(json);
    }

    public static welcomeToJson(value: UsuarioModel[]): string {
        return JSON.stringify(value);
    }

    public static fromObjectToJson(value: UsuarioModel): JSON {
        return JSON.parse(JSON.stringify(value))
    }
}