import { Component, OnInit} from '@angular/core';
import { AlunoService } from '../aluno.service';
import { alunos } from '../aluno';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-clients',
  templateUrl: './Aluno.component.html',
  styleUrls: ['./Aluno.component.css']
})
export class AlunosComponent implements OnInit{
  
  Alunos: alunos[] = [];
  formGroupAluno : FormGroup;
  isEditing: boolean = false;


  constructor(private AlunoService : AlunoService,
              private formBuilder : FormBuilder
              ){
    this.formGroupAluno = formBuilder.group({
      id : [''],
      name : [''],
      email : [''],
      semestre : [''],
      ra : ['']

    });
  }

  ngOnInit(): void {
    this.loadAluno();
  }

  loadAluno(){
    this.AlunoService.getAlunos().subscribe(
      {
        next : data => this.Alunos = data,
        error : () => console.log("Erro ao chamar o endpoint")
      }
    );
  }

  saveAluno(){
    this.AlunoService.save(this.formGroupAluno.value).subscribe(
      {
        next : data => {
          this.Alunos.push(data);
          this.formGroupAluno.reset();
        }
      }
    );

  
  }

  editing(Alunos: alunos): void {
    this.formGroupAluno.setValue(Alunos);
    this.isEditing = true;
  }

  remove(Alunos: alunos): void {
    this.AlunoService.remove(Alunos).subscribe({
       next: () => this.loadAluno()
    });
 }




}
