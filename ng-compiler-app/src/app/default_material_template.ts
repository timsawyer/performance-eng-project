export const DEFAULT_MATERIAL_TEMPLATE = `
<mat-card [style.max-width]="'300px'">
  <mat-card-header>
    <div mat-card-avatar 
      [style.background-size]="cover" 
      [style.background-image]="'url(https://material.angular.io/assets/img/examples/shiba1.jpg);'">
    </div>
    <mat-card-title>Shiba Inu</mat-card-title>
    <mat-card-subtitle>Dog Breed</mat-card-subtitle>
  </mat-card-header>
  <img mat-card-image src="https://material.angular.io/assets/img/examples/shiba2.jpg" alt="Photo of a Shiba Inu">
  <mat-card-content>
    <p>
      The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
      A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
      bred for hunting.
    </p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button>LIKE</button>
    <button mat-button>SHARE</button>
  </mat-card-actions>
</mat-card>
`;
