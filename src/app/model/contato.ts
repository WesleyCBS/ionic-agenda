export class Contato {
    private _nome: string;
    private _telefone: string;

    constructor(nome:string, telefone: string){
        this.nome = nome;
        this.telefone = telefone;
    } 
    public get nome(): string {
        return this._nome;
    }
    public set nome(value: string) {
        this._nome = value;
    }
    public get telefone(): string {
        return this._telefone;
    }
    public set telefone(value: string) {
        this._telefone = value;
    }
}
