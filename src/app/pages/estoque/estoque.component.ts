import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { EstoqueService } from './../../services/estoque.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Estoque } from 'src/app/models/estoque';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css'],
})
export class EstoqueComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'categoriaProduto',
    'quantidade',
    'unidadeQuantidade',
    'actions',
  ];
  dataSource = new MatTableDataSource<Estoque>();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private service: EstoqueService, private dialog: MatDialog) {}

  getEstoque() {
    this.service.getEstoque().subscribe((estoques: Estoque[]) => {
      this.dataSource.data = estoques;
    });
  }

  deleteEstoque(estoque: Estoque) {
    this.service.excluirEstoque(estoque).subscribe(() => {
      this.getEstoque();
    });
  }

  openNovoFuncionario() {
    this.dialog
      .open(NovoEstoqueComponent)
      .afterClosed()
      .subscribe(() => this.getEstoque());
  }

  openEditarEstoque(estoque: Estoque) {
    this.dialog
      .open(EditarEstoqueComponent, { data: estoque })
      .afterClosed()
      .subscribe(() => this.getEstoque());
  }

  ngOnInit(): void {
    this.getEstoque();
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
  selector: 'app-novoEstoque',
  templateUrl: 'novoEstoque.html',
  styleUrls: ['./novoEstoque.css'],
})
export class NovoEstoqueComponent implements OnInit {
  formEstoque: FormGroup;
  estoque: Estoque = {
    id: Math.floor(Math.random() * 100000) + 1,
    nome: '',
    categoriaProduto: '',
    quantidade: 0,
    unidadeQuantidade: '',
  };

  constructor(
    private service: EstoqueService,
    private dialogRef: MatDialogRef<NovoEstoqueComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm(this.estoque);
  }

  createForm(estoque: Estoque) {
    this.formEstoque = this.formBuilder.group({
      nome: [estoque.nome],
      categoriaProduto: [estoque.categoriaProduto],
      quantidade: [estoque.quantidade],
      unidadeQuantidade: [estoque.unidadeQuantidade],
    });
  }

  enviarEstoque() {
    this.service.salvarEstoque(this.formEstoque.value).subscribe();
    this.closeNovoEstoque();
  }

  closeNovoEstoque(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-editarEstoque',
  templateUrl: 'editarEstoque.html',
  styleUrls: ['./editarEstoque.css'],
})
export class EditarEstoqueComponent implements OnInit {
  formEstoque: FormGroup;

  constructor(
    private service: EstoqueService,
    private dialogRef: MatDialogRef<EditarEstoqueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm(this.data);
  }

  createForm(estoque: Estoque) {
    this.formEstoque = this.formBuilder.group({
      id: [estoque.id],
      nome: [estoque.nome],
      categoriaProduto: [estoque.categoriaProduto],
      quantidade: [estoque.quantidade],
      unidadeQuantidade: [estoque.unidadeQuantidade],
    });
  }

  editarEstoque() {
    this.service
      .editarEstoque(this.formEstoque.value)
      .subscribe((err) => console.log(err));
    this.closeEditarEstoque();
  }

  closeEditarEstoque(): void {
    this.dialogRef.close();
  }
}
