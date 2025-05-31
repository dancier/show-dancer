import { Component } from '@angular/core';
import { DataTestDirective } from '@shared/util/data-test.directive';

@Component({
  selector: 'app-about-us',
  template: `
    <div data-test="page-about-us">
      <h1 class="page-header mb-12">Über Uns</h1>
      <div class="flex flex-col gap-12">
        <div class="team-member-section">
          <div class="image-cropper">
            <img
              class="rounded"
              src="../../../assets/img/about-us/marc-profile.jpg"
            />
          </div>
          <h2 class="sub-header">Marc Gorzala</h2>
          <p>
            Also, ich tanze seit ca 7 Jahren Tango. Wie ich sagen würde, recht
            leidenschaftlich. Am Anfang hat mir eine Seite, ich glaube sie hieß
            tanz-mit-mir.net, ganz gut geholfen Tanzpartnerinnen zu finden. War
            diese auch funktional auch ein wenig eigenwillig, vom Design her
            sagen wir mal ein wenig Retro, so war sie doch kostenlos und hatte
            sehr viele aktive Nutzer.
          </p>
          <p>
            Irgendwann ist diese Seite offline gegangen. Ich würde wetten dass
            dies im Zusammenhang mit einer zum selben Zeitpunkt in Kraft
            getretenen europäischen Datenschutz-Gesetzgebung stand ;-)
            Alternative Angebote scheint es nicht zu geben. Meist sind diese
            entweder nicht kostenlos oder die Anzahl der Nutzer ist nicht hoch
            genug. ;-(
          </p>
          <p>
            Da meine Frau und ich beide Informatiker sind, dachte ich dass wir
            es doch hinbekommen sollten eine vernünftige Alternative auf die
            Beine zu stellen. Eine die sowohl kostenlos und so aktiv wie die
            nicht mehr Existierende Seite wäre. Dazu zeitgemäßer in den
            angebotenen Funktionen und direkt in Zusamenarbeit mit anderen
            Tänzern entstehend um deren Befürfnisse am besten zu addresieren.
          </p>
          <p>
            Und Dancier soll und wird genau das sein! Möglichst viele Tanzende
            zusammenbringen und damit die Welt ein wenig netter machen.
          </p>
          <p>
            Ansonsten bin ich Papa von zwei tollen Söhnen, gehe ab und an mal
            klettern, schwimme regelmäsig im Kanal und genieße das Leben.
          </p>
        </div>
        <div class="team-member-section">
          <div class="image-cropper">
            <img
              class="rounded"
              src="assets/img/about-us/dominik-profile.jpg"
            />
          </div>
          <h3 class="my-2 text-xl">Domink Halfkann</h3>
          <p>
            Marc erzählte mir einmal davon, wie schwierig es gerade für Paartanz
            sein kann einen Tanzpartner zu finden um Kurse zu besuchen. Seine
            Idee, mit Dancier eine Plattform für Tänzer zu schaffen, wo jeder
            der möchte mitmachen und auch den passenden Tanzpartner finden kann,
            fand ich richtig klasse. Gerade da wir damit ein echtes Problem
            lösen, was viele Tänzer (oder solche die es werden wollen) in ihrem
            Alltag erleben. Als ich dann noch gehört habe, dass das ganze als
            Herzensprojekt ins Leben gerufen wird und nicht mit dem Ziel durch
            fragwürdige Finanzierungsmodellen möglichst viel Geld einzunehmen,
            war für mich klar, da muss ich mitmachen!
          </p>
          <p>
            Was gibt es zu mir zu sagen? Ich spiele Gitarre, schaue liebend
            gerne alle Arten von Animationskunst, gehe auch mal in einen Pilates
            oder Yoga Kurs - kurzum ich bin der eher ruhige Typ Mensch der sich
            in seiner Freizeit erdet und aus der Ruhe die Kraft schöpft um am
            nächsten Tag wieder voll dabei zu sein.
          </p>
          <p>
            Ich bin 31 Jahre alt und Softwareentwickler aus Leidenschaft. Es ist
            für mich richtig erfüllend, wenn ich sehen kann, dass das was ich
            geschaffen habe Menschen unterstützt und weiter bringt. Ich hoffe
            immer die Welt ein kleines bisschen besser zu machen mit dem was ich
            tue und freue mich darum besonders, ein Teil von Team Dancier zu
            sein.
          </p>
        </div>

        <div class="team-member-section">
          <div class="image-cropper">
            <img
              class="rounded"
              src="assets/img/about-us/xiaofei-profile.jpg"
            />
          </div>
          <h3 class="my-2 text-xl">Xiaofei Gorzala</h3>
          <p>
            Ich tanze noch nicht lange Tango, aber als ich ein Kind war, habe
            ich viel getanzt. Tanzen, Musik und Kunst hab ich im Blut, aber ich
            mag auch noch logische Sachen wie Programmieren. Daher ist
            dancier.net perfekt für mich: eine Kombination von Tanzen, Community
            und Technik. Bei dancier.net bin ich Frontend-Entwicklerin, ich
            unterstütze andere Team-Mitglieder in Entwicklung oder Erstellung
            der Prototypen der verschiedenen Seiten. Beruflich bin ich auch
            Software Entwicklerin bei Zalando Payments.
          </p>
          <p>
            Vor über 1 Jahr bin ich Mama geworden. Der kleine Mann tanzt auch
            sehr gerne zu Musik und gleichzeitig sitzt er auch sehr gerne am
            Computer, er spielt nämlich gerne mit der Tastatur oder Maus.
            Vielleicht wird er sich auch irgendwann am dancier-Projekt
            beteiligen?
          </p>
        </div>

        <div class="team-member-section">
          <div class="image-cropper">
            <img class="rounded" src="assets/img/about-us/jan-profile.jpg" />
          </div>
          <h3 class="my-2 text-xl">Jan Stroppel</h3>
          <p>
            Ich habe bisher nur ein paar Anfängerkurse im Tango belegt, bin also
            nicht der erfahrenste Tänzer. Bei der Onlinesuche nach einer
            passenden Tanzpartnerin bin ich aber immer wieder auf Probleme
            gestoßen. Manch eine Seite war mit einem Abo verbunden und
            dementsprechend wenige Tanzwillige zu finden. Andere Seiten, die
            umsonst waren, waren nicht sehr einladend aufgemacht und die meisten
            Profile Karteileichen. Das wollen wir besser machen und es war mein
            Antrieb bei diesem Projekt mitzuwirken, natürlich neben der
            Möglichkeit neue Technologien auszuprobieren.
          </p>
          <p>
            Ich war die letzten Jahre Fullstack Developer (NodeJS/Kotlin/React),
            komme aufgrund meiner jetzigen Position aber nur noch wenig zum
            Programmieren. Daher nutze ich das Projekt auch dazu, nicht
            einzurosten ;)
          </p>
          <p>
            Was gibt es sonst noch über mich zu sagen? Ich bin gerne in der
            Natur (Fahrrad, Wandern, Kanu) und mag Gesellchaftsspiele und
            Fotogografie.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .image-cropper {
        position: relative;
        overflow: hidden;
        border-radius: 50%;
        width: 100px;
        height: 100px;
      }

      img {
        display: inline;
        margin: 0 auto;
        width: auto;
        height: 100%;
      }
    `,
  ],
  imports: [DataTestDirective],
})
export class AboutUsComponent {
  constructor() {}
}
