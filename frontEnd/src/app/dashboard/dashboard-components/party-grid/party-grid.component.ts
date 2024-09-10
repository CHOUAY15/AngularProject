// party-grid.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { PartyService } from 'src/app/core/service/party.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { DeleteConfirmationDialogComponent } from '../card-folder/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { FeatureService } from 'src/app/core/service/feature.service';
import { AddNewOptionDialogComponent } from '../add-new-option-dialog/add-new-option-dialog.component';
import { OptionService } from 'src/app/core/service/option.service';

interface Feature {
  id: number;
  description: string;
}

interface Party {
  id: number;
  fullName: string;
  address: string;
  feature: Feature;
}

@Component({
  selector: 'app-party-grid',
  templateUrl: './party-grid.component.html',
  styleUrls: ['./party-grid.component.scss'],
})
export class PartyGridComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'fullName',
    'adresse',
    'feature',
    'actions',
  ];
  dataSource: MatTableDataSource<Party>;
  editingParty: Party | null = null;
  fileNum: any;
  fileId: any;
  partyForm: FormGroup;
  editFullNameControl: FormControl;
  editAdresseControl: FormControl;
  editFeatureControl: FormControl;

  features: Feature[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private partyService: PartyService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private featureService: FeatureService,
    private optionService: OptionService,
  ) {
    this.dataSource = new MatTableDataSource<Party>([]);
    this.partyForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[^0-9]*$/)]],
      adresse: ['', [Validators.required]],
      feature: ['', [Validators.required]],
    });
    this.editFullNameControl = new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^0-9]*$/),
    ]);
    this.editAdresseControl = new FormControl('', [Validators.required]);
    this.editFeatureControl = new FormControl('', [Validators.required]);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.fileNum = params.get('fileNum');
      this.fileId = params.get('id');
    });
    this.loadParties(this.fileId);
    this.loadFeatures();
  }

  loadParties(fileId: number) {
    this.partyService.getAllPartiesByFile(fileId).subscribe(
      (data) => (this.dataSource.data = data),
      (error) => console.error('Error fetching parties', error)
    );
  }
  loadFeatures() {
    this.featureService.getAllFeatures().subscribe(
      data => this.features = data,
      error => console.error('Error fetching features', error)
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'العناصر في الصفحة:';
    this.paginator._intl.nextPageLabel = 'الصفحة التالية';
    this.paginator._intl.previousPageLabel = 'الصفحة السابقة';
    this.paginator._intl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) => {
      if (length === 0 || pageSize === 0) {
        return `0 من ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} من ${length}`;
    };
  }

  addParty() {
    if (this.partyForm.valid) {
      const newParty: Party = {
        id: 0,
        fullName: this.partyForm.get('fullName')?.value,
        address: this.partyForm.get('adresse')?.value,
        feature: this.partyForm.get('feature')?.value,
      };

      console.log('hbibibibib', newParty);
      this.partyService.addPartyToFile(newParty, this.fileId).subscribe(
        (createdParty) => {
          this.dataSource.data = [...this.dataSource.data, createdParty];
          this.partyForm.reset();

          this.dialog.open(SuccessDialogComponent, {
            width: '350px',
            data: {
              title: 'تمت الإضافة بنجاح',
              message: `تمت إضافة الطرف ${createdParty.fullName} بنجاح.`,
            },
          });
        },
        (error) => console.error('Error creating party', error)
      );
    }
  }

  editParty(party: Party) {
    this.editingParty = { ...party };
    this.editFullNameControl.setValue(party.fullName);
    this.editAdresseControl.setValue(party.address);
    this.editFeatureControl.setValue(party.feature);
  }

  updateParty() {
    if (
      this.editingParty &&
      this.editFullNameControl.valid &&
      this.editAdresseControl.valid &&
      this.editFeatureControl.valid
    ) {
      const updatedParty: Party = {
        ...this.editingParty,
        fullName: this.editFullNameControl.value,
        address: this.editAdresseControl.value,
        feature: this.editFeatureControl.value,
      };
      this.partyService.updateParty(updatedParty.id, updatedParty).subscribe(
        (updatedParty) => {
          const index = this.dataSource.data.findIndex(
            (c) => c.id === updatedParty.id
          );
          if (index !== -1) {
            this.dataSource.data[index] = updatedParty;
            this.dataSource.data = [...this.dataSource.data];
          }
          this.editingParty = null;
        },
        (error) => console.error('Error updating party', error)
      );
    }
  }

  deleteParty(id: number, name: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '350px',
      data: { dataProp: name, dataTitle: 'الطرف' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.partyService.deletePartyFromFile(this.fileId, id).subscribe(
          (response) => {
            this.dataSource.data = this.dataSource.data.filter(
              (party) => party.id !== id
            );

            this.dialog.open(SuccessDialogComponent, {
              width: '350px',
              data: {
                title: 'تمت الازالة بنجاح',
                message: `تمت ازالة الطرف ${name} بنجاح.`,
              },
            });
          },
          (error) => console.error('Error deleting party', error)
        );
      }
    });
  }

  cancelEdit() {
    this.editingParty = null;
  }

  isEditing(party: Party): boolean {
    return this.editingParty !== null && this.editingParty.id === party.id;
  }

  addNewOption(field: string) {
    let dialogConfig;
    switch (field) {
      case 'feature':
        dialogConfig = {
          title: 'إضافة صفة جديدة',
          fields: [
            {
              name: 'description',
              label: ' إسم الصفة ',
              validators: [Validators.required],
            },
          ],
        };
        break;
      default:
        return;
    }

    const dialogRef = this.dialog.open(AddNewOptionDialogComponent, {
      width: '400px',
      data: dialogConfig,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (field) {
          
          case 'feature':
            this.optionService.addFeature(result).subscribe(
              (response: any) => {
                this.features.push(response);
                this.partyForm.get('feature')?.setValue(response);
              },
              (error: any) => {
                console.error('Error adding action:', error);
              }
            );
            break;
        }
      }
    });
  }
}
