import { Funcionario } from './../../models/funcionario';
import { FuncionarioService } from './../../services/funcionario.service';
import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  Inject,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['./funcionario.component.css'],
})
export class FuncionarioComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'cpf',
    'funcao',
    'ativo',
    'actions',
  ];
  dataSource = new MatTableDataSource<Funcionario>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private service: FuncionarioService, private dialog: MatDialog) {}

  getFuncionario() {
    this.service.getFuncionarios().subscribe((funcionarios: Funcionario[]) => {
      console.log(funcionarios);
      this.dataSource.data = funcionarios;
    });
  }

  deleteFuncionario(funcionario: Funcionario) {
    this.service.excluirFuncionario(funcionario).subscribe(() => {
      this.getFuncionario();
    });
  }

  openNovoFuncionario() {
    this.dialog
      .open(NovoFuncionarioComponent)
      .afterClosed()
      .subscribe(() => this.getFuncionario());
  }

  openEditarFuncionario(funcionario: Funcionario) {
    this.dialog
      .open(EditarFuncionarioComponent, { data: funcionario })
      .afterClosed()
      .subscribe(() => this.getFuncionario());
  }

  ngOnInit(): void {
    this.getFuncionario();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.nextPageLabel = 'Próxima';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.paginator._intl.firstPageLabel = 'Primeira página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) => {
      if (length === 0 || pageSize === 0) {
        return `0 até ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return `${startIndex + 1} à ${endIndex} até ${length}`;
    };
    this.dataSource.paginator = this.paginator;
  }
}

@Component({
  selector: 'app-novoFuncionaro',
  templateUrl: 'novoFuncionario.html',
  styleUrls: ['./novoFuncionario.css'],
})
export class NovoFuncionarioComponent implements OnInit {
  formFuncionario: FormGroup;
  funcionario: Funcionario = {
    id: Math.floor(Math.random() * 100000) + 1,
    nome: '',
    cpf: '',
    funcao: '',
    ativo: false,
  };

  constructor(
    private service: FuncionarioService,
    private dialogRef: MatDialogRef<NovoFuncionarioComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm(this.funcionario);
  }

  createForm(funcionario: Funcionario) {
    this.formFuncionario = this.formBuilder.group({
      nome: [funcionario.nome],
      cpf: [funcionario.cpf],
      funcao: [funcionario.funcao],
      ativo: [funcionario.ativo],
    });
  }

  enviarFuncionario() {
    this.service.salvarFuncionario(this.formFuncionario.value).subscribe();
    this.closeNovoFuncionario();
  }

  closeNovoFuncionario(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-editarFuncionaro',
  templateUrl: 'editarFuncionario.html',
  styleUrls: ['./editarFuncionario.css'],
})
export class EditarFuncionarioComponent implements OnInit {
  formFuncionario: FormGroup;

  constructor(
    private service: FuncionarioService,
    private dialogRef: MatDialogRef<EditarFuncionarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.retornaAtivo();
    this.retornarFuncao();
    console.log(this.data);
    this.createForm(this.data);
  }

  createForm(funcionario: Funcionario) {
    this.formFuncionario = this.formBuilder.group({
      id: this.data.id,
      nome: [funcionario.nome],
      cpf: [funcionario.cpf],
      funcao: [funcionario.funcao],
      ativo: [funcionario.ativo],
    });
  }

  editarFuncionario() {
    this.service.editarFuncionario(this.formFuncionario.value).subscribe();
    this.closeEditarFuncionario();
  }

  closeEditarFuncionario(): void {
    this.dialogRef.close();
  }

  retornaAtivo() {
    console.log(this.data);
    if (this.data.ativo == true) {
      this.data.ativo = 'true';
      return this.data;
    }
    this.data.ativo = 'false';
    return this.data;
  }

  retornarFuncao() {
    if (this.data.funcao === 'Garçom') {
      this.data.funcao = 'GARCOM';
      return this.data;
    } else if (this.data.funcao === 'Coordenador') {
      this.data.funcao = 'COORDENADOR';
      return this.data;
    }
    this.data.funcao = 'COZINHEIRO';
    return this.data;
  }
}
