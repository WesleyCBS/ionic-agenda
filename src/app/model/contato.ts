export class Contato {
    private _nome: string;
    private _telefone: string;
    private _genero?: string;
    private _dataNascimento?: string;
  
    constructor(nome: string, telefone: string, genero?: string, dataNascimento?: string) {
      this._nome = nome;
      this._telefone = telefone;
      this._genero = genero;
      this._dataNascimento = dataNascimento;
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
  
    public get genero(): string | undefined {
      return this._genero;
    }
  
    public set genero(value: string | undefined) {
      this._genero = value;
    }
  
    public get dataNascimento(): string | undefined {
      return this._dataNascimento;
    }
  
    public set dataNascimento(value: string | undefined) {
      this._dataNascimento = value;
    }
  }
  
  
