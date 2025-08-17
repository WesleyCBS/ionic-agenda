import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule,  } from '@ionic/angular';
import { Router } from '@angular/router';
import { Contato } from 'src/app/model/contato';
import { ContatoService } from 'src/app/service/contato.service';
import { AlertController  } from '@ionic/angular/standalone';



@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
  standalone: true,
    imports: [IonicModule, CommonModule, FormsModule]

})

export class DetalharPage implements OnInit {
  contato!: Contato;
  nome!: string;
  telefone!: string;
  dataNascimento!: string;
  genero!: string;
  editar: boolean = true;
  maxDate!: string;

  constructor(private router: Router, private alertController: AlertController, private contatoService: ContatoService) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if(nav?.extras?.state?.['objeto']) {
      this.contato = nav?.extras?.state?.['objeto'];
      this.nome = this.contato.nome;
      this.telefone = this.contato.telefone;
      this.dataNascimento = this.contato.dataNascimento || '';
      this.genero = this.contato.genero || '';
    }
  }
  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

private validar(campo:any) : boolean{
    if(!campo){
      return false;
    }
    return true;
  }
  salvar(){
    this.dataNascimento = this.dataNascimento.split('T')[0];
    if(!this.validar(this.nome) || !this.validar(this.telefone)){
      this.presentAlert("Erro ao cadastar", "Erro ao cadastrar")
      return
    }
    if(this.contatoService.editar(this.contato, this.nome, this.telefone, this.genero, this.dataNascimento)){
      this.presentAlert('Atualizar', 'Contato atualizado com sucesso')
      this.router.navigate(['/home'])
    }else{
      this.presentAlert('Atualizar', 'Erro ao atualizar contato')
    }
  }
  excluir(){
    this.presentConfirmAlert("Excluir Contato", "Você realmente deseja excluir contato",
      this.excluirContato()
    )
  }

  excluirContato(){
    if(this.contatoService.delete(this.contato)){
      this.presentAlert("Excluir", "Exclusão efetuada com sucesso");
      this.router.navigate(['/home'])
    }else{
      this.presentAlert("Erro ao Excluir", "Contato não Encontrado")
    }
  }

  alterarEdicao(){
    if(this.editar == false){
      this.editar = true;
  }else{
    this.editar = false;
  }
}

async presentConfirmAlert(subHeader: string, message: string, acao: any) {
  const alert = await this.alertController.create({
    header: 'Agenda de Conatatos',
    subHeader: subHeader,
    message: message,
    buttons: [
      {text: 'Cancelar', role: 'cancelar', cssClass: 'secondary', handler:()=>{}},
      {text: 'Confirmar', handler:(acao)=>{acao}}
    ],
  });

  await alert.present();
}

}
