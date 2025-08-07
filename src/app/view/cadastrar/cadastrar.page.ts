import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';   
import { Router } from '@angular/router';
import { ContatoService } from 'src/app/service/contato.service';
import { Contato } from 'src/app/model/contato';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CadastrarPage implements OnInit {
  nome!: string;
  telefone!: string;
  dataNascimento!: string;
  genero!: string;
  maxDate!: string;

  constructor(
    private contatoService: ContatoService,
    private router: Router,
    private alertController: AlertController
  ) { 
    const hoje = new Date();
    this.maxDate = hoje.toISOString().split('T')[0];
  }

  ngOnInit() {}

  cadastrar() {
    if (!this.validar(this.nome) || !this.validar(this.telefone)) {
      this.presentAlert("Erro ao Cadastrar", "Campos Obrigatórios: Nome e Telefone");
      return;
    }

    const contato: Contato = new Contato(
      this.nome,
      this.telefone,
      this.genero,
      this.dataNascimento || ''
    );

    this.contatoService.create(contato);
    this.presentAlert("Sucesso", "Contato Cadastrado");
    this.router.navigate(["/home"]);
  }

  private validar(campo: any): boolean {
    return campo != null && campo.toString().trim().length > 0;
  }

  async presentAlert(subheader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subheader,
      message: message,
      buttons: ['Ok'],
    });
    await alert.present();
  }
}

