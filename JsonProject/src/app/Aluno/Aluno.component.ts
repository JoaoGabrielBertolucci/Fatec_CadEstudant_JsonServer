import { Component, OnInit} from '@angular/core';
import { ClientsService } from '../aluno.service';
import { alunos } from '../aluno';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-clients',
  templateUrl: './Aluno.component.html',
  styleUrls: ['./Aluno.component.css']
})
export class ClientsComponent implements OnInit{
  
  Clients : alunos[] = [];
  formGroupCliente : FormGroup;
  isEditing: boolean = false;


  constructor(private ClientsService : ClientsService,
              private formBuilder : FormBuilder
              ){
    this.formGroupCliente = formBuilder.group({
      id : [''],
      name : [''],
      email : ['']
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(){
    this.ClientsService.getClients().subscribe(
      {
        next : data => this.Clients = data,
        error : () => console.log("Erro ao chamar o endpoint")
      }
    );
  }

  saveClients(){
    this.ClientsService.save(this.formGroupCliente.value).subscribe(
      {
        next : data => {
          this.Clients.push(data);
          this.formGroupCliente.reset();
        }
      }
    );

  
  }

  editing(client: alunos): void {
    this.formGroupCliente.setValue(client);
    this.isEditing = true;
  }

  remove(client: alunos): void {
    this.ClientsService.remove(client).subscribe({
       next: () => this.loadClients()
    });
 }




}
