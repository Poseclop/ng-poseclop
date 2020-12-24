import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/operators';

type TExperience = { dateFrom: Date, dateTo?: Date, title: string, subTitle: string, content: Array<string>, image: string };

@Component({
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  animations: [
    trigger('switchPicture', [
      transition(':enter', [
        animate('1s', keyframes([
          style({ opacity: 0 }),
          style({ opacity: 1 })
        ]))
      ]),
      transition('* => *', [
        animate('1s', keyframes([
          style({ opacity: 1 }),
          style({ opacity: 0 }),
          style({ opacity: 1 })
        ]))
      ])
    ])
  ]
})
export class AboutMeComponent implements OnInit {

  experiences: Array<TExperience> = [
    {
      dateFrom: new Date('05/01/2019'),
      title: 'Développeur Analyste',
      subTitle: 'Opale Solutions, Genève',
      content: ['Développement d\'applications web pour les établisseement de santé en Suisse.'],
      image: 'opale'
    },
    {
      dateFrom: new Date('03/02/2017'),
      dateTo: new Date('11/01/2018'),
      title: 'Business Planner, Gillette CEEMEA',
      subTitle: 'Procter & Gamble, Genève',
      content: ['Responsable de la logistique pour Gillette sur les régions MEA + India. Mise en place et supervision des chaînes logistiques, qualification des nouveaux produits',
        'Responsable des prévisions de vente et analyste pour l\'équipe logistique Gillette EMEA.'
      ],
      image: 'supply-planner'
    },
    {
      dateFrom: new Date('10/01/2014'),
      dateTo: new Date('02/01/2017'),
      title: 'Artwork Copy Expert, Gillette',
      subTitle: 'Procter & Gamle, Genève',
      content: ['Responsable de la communication sur le packaging ainsi que de sa conformité dans les différents marchés'],
      image: 'ace'
    },
    {
      dateFrom: new Date('02/01/2013'),
      dateTo: new Date('09/01/2014'),
      title: 'Supply Planning Analyst CEEMEA Headquarter',
      subTitle: 'Procter & Gamble, Genève',
      content: ['Analyste des opérations de logistique pour la région CEEMEA. Responsable de la préparations de rapports utilisés par les directeurs regionaux des différentes divisions.'],
      image: 'business-analyst'
    },
    {
      dateFrom: new Date('06/01/2010'),
      dateTo: new Date('01/01/2013'),
      title: 'Global Artwork Planner, Gillette',
      subTitle: 'Procter & Gamble, Genève',
      content: ['Coordination du processus de création des packaging pour l\'Europe, le Moyen-Orient et l\'Afrique. Embauché après 6 mois d\'intérim par une équipe basé a Boston.'],
      image: 'artwork-planner'
    },
    {
      dateFrom: new Date('02/01/2010'),
      title: 'BsC in International Hospitality Management',
      subTitle: 'Ecole Hôtelière de Lausanne, Suisse',
      content: ['Egalement titulaire d\'un diplôme HES d\'économiste d\'entreprise'],
      image: 'graduation'
    },
    {
      dateFrom: new Date('07/01/2008'),
      dateTo: new Date('01/01/2009'),
      title: 'Planificateur des évènement',
      subTitle: 'Hotel Radisson Tahiti, Polynésie française',
      content: ['Stage de 6 mois. Responsable de la promotion de la planification et du service pour les évènements. Représentation du département "évènements" au commité exécutif',
        'En plus des évènement réguliers, organisation de plus de 30 mariages, d\'un rassemblement politique et d\'un défilé de mode.'
      ],
      image: 'tahiti'
    },
    {
      dateFrom: new Date('01/01/2006'),
      dateTo: new Date('06/01/2006'),
      title: 'Barman au Ernest Bar',
      subTitle: 'Hotel Lutetia, Paris',
      content: ['Stage de 6 mois. Préparation et service des boissons en Front-office. Travail de nuit.',
        'Responsable des stagiaires du bar (4 personnes). Assignation des responsabilité et gestion des emplois du temps'
      ],
      image: 'lutetia'
    },
    {
      dateFrom: new Date('04/01/2005'),
      title: 'Début des études en Management Hotelier International',
      subTitle: 'Ecole Hotelière de Lausanne, Suisse',
      content: ['Cursus de 4 ans et demi spécialisé dans la gestion hôtelière et le management des opérations de service'],
      image: 'ehl'
    },
    {
      dateFrom: new Date('09/01/2004'),
      title: 'Baccalauréat Scientifique',
      subTitle: 'Lycée Sainte Jeanne Elisabeth, Paris, France',
      content: ['Spécialisation SVT, Mention Assez Bien'],
      image: 'paris'
    },
  ];

  imageExperienceIndex = 0;
  blockscroll = false;
  scrollY = 0;
  smallScreen$: Observable<boolean>;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    observer: BreakpointObserver,
    private _http: HttpClient
  ) {
    this.registerIcons(iconRegistry, sanitizer);
    this.smallScreen$ = observer.observe('(max-width: 1200px)').pipe(
      map(breakpoints => breakpoints.matches)
    );
  }

  ngOnInit(): void {
    this.smallScreen$.pipe(
      take(1)
    ).subscribe(smallScreen => {
      this.experiences.forEach(experience => {
        const _img = new Image();
        _img.src = `/assets/img/${experience.image}${smallScreen ? '_large' : ''}.png`;
      });
    });
    // const chronologyData: IDateObject[] = this.experiences.map(el => ({
    //   date: el.dateFrom,
    //   label: el.title
    // }));
    // this.chronology = new Chronology(650, 900, { top: 20, left: 20, right: 20, bottom: 20 }, chronologyData);
  }

  private registerIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer): void {
    iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/facebook.svg'));
    iconRegistry.addSvgIcon('linkedin', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/linkedin.svg'));
    iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/github.svg'));
    iconRegistry.addSvgIcon('npm', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/npm.svg'));
  }

  onSelectionChange(event: StepperSelectionEvent): void {
    setTimeout(() => {
      this.imageExperienceIndex = event.selectedIndex;
    }, 500);
  }

  onStepClick(): void {
    this.blockscroll = true;
    this.scrollY = window.scrollY;
  }

  onStepAnimationDone(title: HTMLHeadingElement): void {
    this.blockscroll = false;
    // title.scrollIntoView();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    if (this.blockscroll) {
      scrollTo(window.scrollX, 662);
    }
  }

}
