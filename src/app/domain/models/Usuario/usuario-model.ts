export interface UsuarioModel {
    id: string;
    nombre: string;
    email: string;
    codigo: string;
    grado: string;
    rol: string;
    roles: any;
    contraseña: string;
    estado: boolean;
    grados:any;
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