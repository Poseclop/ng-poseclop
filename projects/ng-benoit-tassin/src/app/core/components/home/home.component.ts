import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, map, take, tap } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { ToolBottomSheetComponent } from '../tool-bottom-sheet/tool-bottom-sheet.component';
import { HttpClient } from '@angular/common/http';

type TcardTypes = 'html' | 'css' | 'javascript' | 'd3' | 'pwa' | 'photoshop' | 'angular' | 'material' | 'default';
type TbackEndCardTypes = 'backEnd' | 'cloud' | 'serverless' | 'socketIO';
export type TCardDetail = { title?: string, icon?: string, paragraphs?: string[], picture: string };
type TcardsDetails = { [K in TcardTypes]: TCardDetail };
type TbackEndCardsDetails = { [K in TbackEndCardTypes]: {
  title: string,
  icon?: string,
  paragraphs: string[],
  picture: string,
  svgIcon?: string
} };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
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
export class HomeComponent implements OnInit {

  currentCard = new BehaviorSubject<TcardTypes>('default');
  switchCard$ = this.currentCard.pipe(
    debounceTime(500),
    map(key => this.cardsDetails[key]),
  ).subscribe(card => {
    this.shownCard = card;
  });
  cardsDetails: TcardsDetails = {
    html: {
      title: 'HTML 5',
      icon: 'html5',
      picture: 'html.png',
      paragraphs: [
        'le HTML est au coeur du dévelopment front-end. C\'est le language qui permet a votre browser internet d\'afficher des pages web puis d\'interagir avec ces dernières.',
        'C\'est aussi le language utilisé par les moteurs de recherche pour interpréter le contenu des pages. De fait, le html doit suivre une sémanthique, permettant aux machines de naviguer et consulter facilement son contenu. Ceci permet non seulement un meilleur référencement web mais aussi une meilleur accessibilité pour les personnes en situation d\'handicap (balises de lecture, aides a la navigation, etc.)'
      ]
    },
    css: {
      title: 'CSS',
      icon: 'css',
      picture: 'css.png',
      paragraphs: [
        'CSS est le language utilisé pour styliser les pages internet. La où hmtl défini le contenu d\'une page, css détermine sa présentation. Il permet aussi de créer des animations pour rendre votre site plus dynamique et améliorer l\'expérience de vos utilisateurs',
        'CSS devient pariculièrement puissant quand il est utilisé en combinaison avec d\'autres languages. Permettant ainsi de manipuler le style en réponse aux intéractions de l\'utilisateur.'
      ]
    },
    javascript: {
      title: 'JAVASCRIPT',
      icon: 'javascript',
      picture: 'javascript.png',
      paragraphs: [
        'Javascript est les troisième pilier des pages web modernes. C\'est le language utilisé par les navigateurs internet pour créer des logiques, permettant ainsi aux utilisateurs d\'intéragir avec l\'application.',
        'Ce language a bénéficié d\'un dévelopment massif au cours des dernières années, alors que les navigateurs internet devenaient plus puissant. Aujourd\'hui, il supporte des fonctions avancées, permettant de faire fonctionner des applications complexes directement depuis internet.'
      ]
    },
    d3: {
      title: 'D3',
      icon: 'd3',
      picture: 'd3.png',
      paragraphs: [
        'D3 est une bibliothèque javascript permettant de créer et manipuler des graphiques vectorisés en direct. Elle est ainsi trés utilisé par les journalistes et analyste, pour créer des visualisation de données interactives (cartes, graphiques, matrices, etc...)',
        'Au delà de la représentation de données, D3 peut aussi être utilisé pour créer des animations graphiques avancées, intéragissant avec les actions de l\'utilisateur.'
      ]
    },
    pwa: {
      title: 'PWA',
      icon: 'pwa',
      picture: 'pwa.png',
      paragraphs: [
        'PWA (Progressive Web Application) est un terme générique regroupant plusieurs fonctionalitées récemment ajoutées aux applications internet et sites web et qui permettent de simuler un comportement d\'application dîte "native" (IOS, Android,..) sur une application Web.',
        'On retiendra en particulier la possibilité d\'installer les applications internet sur les smartphones et tablettes, la capacité de stocker des données pour permettre une utilisation plus rapide et une offline, et enfin l\'accès a certaines parties du hardware utilisé (appareil photo du smartphone, boutons,...).'
      ]
    },
    photoshop: {
      title: 'PHOTOSHOP',
      icon: 'photoshop',
      picture: 'photoshop.png',
      paragraphs: [
        'Photoshop est utilisé pour concevoir le layout et les assets graphiques utilisés dans nos applications. Ces assets peuvent être préparés rapidement puis partagés avec nos partenaires pour aligner le rendu final.',
        'Photoshop permet aussi la création de masques (images avec transparence) qui améliorent grandement le rendu graphique d\'un site web par rapport à une page "traditionelle".'
      ]
    },
    angular: {
      title: 'ANGULAR',
      icon: 'angular',
      picture: 'angular.png',
      paragraphs: [
        'Angular est un framework maintenu par Google et utilisé pour le développement d\applications web dites "1 pager".',
        'A la différence d\'un site tranditionel, les pages web d\'applications "1 pager" sont rendues (générées) directement par le navigateur de l\'utilisateur et ne nécessite donc pas d\'intéraction avec un serveur distant, réduisant ainsi les coût et accélérant l\'affichage des pages.',
        'Angular apporte aussi une structure au code servant a générer les pages web, ce qui facilite la maintenabilité de l\'application'
      ]
    },
    material: {
      title: 'MATERIAL DESIGN',
      icon: 'material_design',
      picture: 'material_design.png',
      paragraphs: [
        'Material Design regroupe un ensemble d\'outils et de recommandations développées pas Google, afin d\'harmoniser le layout des sites et applications web. Ceci permet aux utilisateurs de naviguer sur les pages de façon plus intuitive.',
        'En plus de suivre les recommandations material design, nous utilisons des composant crées directement par google pour assurer un layout consistant sur nos applications.'
      ]
    },
    default: {
      picture: 'front_end.jpg',
    }
  };
  backEndCardDetails: TbackEndCardsDetails = {
    backEnd: {
      title: 'Back End',
      icon: 'developer_board',
      paragraphs: ['Le développement Back-end englobe tous les outils et techniques utilisées pour la gestion de base de données et les intéractions entre front end et serveur'],
      picture: 'back-end.jpg'
    },
    cloud: {
      title: 'Cloud',
      icon: 'wb_cloudy',
      paragraphs: ['Le côté back-end de nos applications peut être hébergé sur le cloud de votre choix; vous évitant ainsi les coût associés à la gestion de serveur'],
      picture: 'cloud.jpg'
    },
    serverless: {
      title: 'Serverless',
      svgIcon: 'lambda',
      paragraphs: ['No applications peuvent être déployées en mode "serverless" pour lesquelles aucun serveur n\'est requis, réduisant grandemment les coûts sans réduire la qualité de l\'hébergement'],
      picture: 'serverless.jpg'
    },
    socketIO: {
      title: 'Socket IO',
      svgIcon: 'forum-outline',
      paragraphs: ['Socket IO permet une communication instantanée entre utilisateur et serveur, permettant ainsi la création d\'applications participatives (par exemple: chat)'],
      picture: 'socket-io.jpg'
    }
  };

  shownCard = this.cardsDetails.default;
  smallScreen$: Observable<boolean>;

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    observer: BreakpointObserver,
    private _bottomSheet: MatBottomSheet,
    private _http: HttpClient,
  ) {
    iconRegistry.addSvgIcon('html5', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/html5.svg'));
    iconRegistry.addSvgIcon('css', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/css.svg'));
    iconRegistry.addSvgIcon('javascript', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/javascript.svg'));
    iconRegistry.addSvgIcon('angular', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/angular.svg'));
    iconRegistry.addSvgIcon('d3', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/d3.svg'));
    iconRegistry.addSvgIcon('pwa', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/pwa.svg'));
    iconRegistry.addSvgIcon('photoshop', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/photoshop.svg'));
    iconRegistry.addSvgIcon('material_design', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/material_design.svg'));
    iconRegistry.addSvgIcon('globe-grid', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/globe-grid.svg'));
    iconRegistry.addSvgIcon('lambda', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/lambda.svg'));
    iconRegistry.addSvgIcon('forum-outline', sanitizer.bypassSecurityTrustResourceUrl('assets/svg/forum-outline.svg'));
    this.smallScreen$ = observer.observe('(max-width: 450px)').pipe(
      map(breakpoints => breakpoints.matches)
    );
  }

  ngOnInit(): void {
    Object.keys(this.cardsDetails).forEach((key) => {
      const _img = new Image();
      // @ts-ignore
      _img.src = `/assets/img/${this.cardsDetails[key].picture}`;
    });
  }

  onCardClick(type: TcardTypes): void {
    this.smallScreen$.pipe(
      take(1)
    ).subscribe(smallScreen => {

      const dialogConfig: MatBottomSheetConfig = {
        backdropClass: 'tool-bottom-sheet__backdrop',
        panelClass: 'tool-bottom-sheet__panel',
        data: this.cardsDetails[type]
      };

      if (smallScreen) {
        this._bottomSheet.open<ToolBottomSheetComponent, TcardsDetails, void>(ToolBottomSheetComponent, dialogConfig);
      }
    });
  }
}
