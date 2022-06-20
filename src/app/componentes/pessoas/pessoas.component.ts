import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Pessoa } from 'src/app/Pessoa';
import { PessoaService } from 'src/app/pessoa.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  formulario: any;
  tituloFormulario: string;
  pessoas : Pessoa[];

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  constructor(private pessoaService: PessoaService, private  toastr : ToastrService) { }

  ngOnInit(): void {
    this.pessoaService.PegarTodos().subscribe(resultado=>
      this.pessoas = resultado);
  }
  ExibirFormularioCadastro(): void{
    this.visibilidadeTabela=false;
    this.visibilidadeFormulario=true;

    this.tituloFormulario = 'Nova Pessoa';
    this.formulario = new  FormGroup({
      //forms controle são os inputs
      nome: new FormControl(null),
      sobreNome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null)

    });
  }
  ExibirFormularioAtualizacao(pessoaId): void {
    this.visibilidadeTabela=false;
    this.visibilidadeFormulario=true;

    this.pessoaService.PegarPeloId(pessoaId).subscribe(resultado=> {
      this.tituloFormulario = `Atualizar ${resultado.nome} ${resultado.sobreNome}`;

      this.formulario = new  FormGroup({
         //forms controle são os inputs
        pessoaId: new FormControl(resultado.pessoaId),
        nome: new FormControl(resultado.nome),
        sobreNome: new FormControl(resultado.sobreNome),
        idade: new FormControl(resultado.idade),
        profissao: new FormControl(resultado.profissao)
      });
    });
  }

  EnviarFormulario(): void{
    //criar as variaveis para ter os dados do form
    const pessoa: Pessoa = this.formulario.value;
    if(pessoa.pessoaId>0){
      this.pessoaService.AtualizarPessoa(pessoa).subscribe(resultado=> {
        this.visibilidadeFormulario=false;
        this.visibilidadeTabela=true;
        //alert('Pessoa Atualizada com sucesso');
        this.toastr.warning('Atualizando!', 'Atualizado com Sucesso!');
        this.pessoaService.PegarTodos().subscribe((registros) => {
          this.pessoas = registros;
        });
      });
    }
    else {

    this.pessoaService.SalvarPessoa(pessoa).subscribe((resultado) =>{
      this.visibilidadeTabela=true;
      this.visibilidadeFormulario=false;
      //alert('pessoa inserida com sucesso');
      this.toastr.success('Gravando!', 'Inserido com Sucesso!');
      this.pessoaService.PegarTodos().subscribe(registros=> {
      this.pessoas= registros
      });
    
    });
    }
  }

  ExcluirPessoa(pessoaId) {
    this.pessoaService.ExcluirPessoa(pessoaId).subscribe((resultado)=> {
      this.visibilidadeFormulario=false;
      this.visibilidadeTabela=true;
      this.toastr.error("Registro será deletado", "Deletando!");
      this.pessoaService.PegarTodos().subscribe(registros => {
        this.pessoas = registros;
      });
    });
  }
  Voltar(): void {
      this.visibilidadeTabela=true;
      this.visibilidadeFormulario=false;
   }
}
