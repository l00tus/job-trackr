import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class CustomPaginatorService extends MatPaginatorIntl{

  override itemsPerPageLabel = `Applications per page:`;

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 of ${length}`;
    }

    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1} - ${endIndex} of ${length}`;
  };
}
