// backend/seeders/blogSeeder.ts
import Blog from '../models/blogModel';
import User from '../models/userModel';

const blogContent =
    'Kremljolog Mark Galeotti, autor brojnih knjiga o Rusiji i Vladimiru Putinu, u svojoj je analizi za britanski The Times ocijenio da smrt, točnije samoubojstvo Romana Starovojta, svega nekoliko sati nakon što ga je ruski čelnik smijenio s mjesta ministra prometa, pomaže da se ispita i analizira kriza koja se sporim tempom odvija među ruskim elitama.\n' +
    '\n' +
    'Podsjetimo, u ponedjeljak je tijelo Romana Starovojta pronađeno u blizini njegova automobila na periferiji Moskve. Istražitelji su rekli da se, nakon što je čuo da je otpušten, odvezao na mjesto gdje je potom pronađeno njegovo tijelo i oduzeo si život pištoljem koji mu je uručen kao nagrada za službu svojoj zemlji.\n' +
    '\n' +
    'Iako postoje neizbježna nagađanja da je ubijen - a postoje i neke sugestije da je umro ranije nego što to tvrdi priča istražitelja - u ovom se trenutku čini vjerodostojnom tvrdnja da je počinio suicid, piše Galeotti. A pritom je svojom smrću otvorio korisni diskurs kroz koji se može ispitati ‘puzajuća‘ politička kriza koja se odvija u Rusiji, dok nade u skori kraj rata koji je Putin započeo u Ukrajini kopne.\n' +
    '\n' +
    '‘Rospil‘ kao nešto normalno\n' +
    'Prije nego što je postao ministar prometa, 53-godišnji Starovojt bio je guverner Kurska, regije u kojoj su ukrajinske snage u kolovozu prošle godine izvršile invaziju, na Putinovo veliko ogorčenje. Procjenjuje se da je petina od 20 milijardi rubalja (190 milijuna funti) dodijeljenih za izgradnju obrambenih utvrda na granici očito bila pronevjerena.\n' +
    '\n' +
    'Ruske elite moraju se prilagoditi neugodnoj novoj stvarnosti. Stara shvaćanja o tome što može, a što ne može proći nekažnjeno, mijenjaju se, ali nitko nije posve siguran kako. Još ne tako davno, ono što su Starovojt i Smirnov navodno učinili smatralo bi se prihvatljivom korupcijom. Sada to nitko može znati\n' +
    '\n' +
    'Starovojtov nasljednik na mjestu guvernera, Aleksej Smirnov, uhićen je u travnju i bila je javna tajna da je spreman ‘utopiti‘ svog bivšeg pokrovitelja.\n' +
    '\n' +
    'Čuvši da ga otpuštaju - što je bio uvod u uhićenje - čini se da se Starovojt upucao, radije nego da se suoči s ponižavajućim suđenjem i više od desetljeća zatvora. A moguće je i da je bio posve zatečen.\n' +
    '\n' +
    'Naime, pronevjera sredstava od velikih projekata nabave toliko je normalna u Rusiji da za nju čak postoji poseban izraz, ‘rospil‘, kao koruptivno ‘rezanje proračuna‘, odnosno zadržavanje svojeg dijela ‘kolača‘. U tom kontekstu, uzimanje 20 posto sredstava osiguranih za neki projekt obično je bilo u okvirima standardne prakse.\n' +
    '\n' +
    'Promjena pravila\n' +
    'No, kao što pokazuju ovaj i drugi incidenti te uhićenja moćnika, poput nedavnog uhićenja tajkuna biznisa sa zlatom Konstantina Strukova, ruske elite moraju se prilagoditi neugodnoj novoj stvarnosti. Stara shvaćanja o tome što može, a što ne može proći nekažnjeno, mijenjaju se, ali nitko nije posve siguran kako. \n' +
    'Još ne tako davno, ono što su Starovojt i Smirnov navodno učinili smatralo bi se prihvatljivom korupcijom. Sada, međutim, ističe Galeotti, tko to može znati. Kao što je primijetio jedan veteran ruskog poslovnog svijeta: "Niste morali voljeti [Putina], ali ste morali cijeniti njegovu jasnoću, njegovu dosljednost. Znali ste pravila i sve dok ste ih slušali, mogli ste napredovati".\n' +
    '\n' +
    'No, otkako je Rusija pokrenula svoju sveobuhvatnu invaziju na Ukrajinu 2022. godine, ovaj relativno stabilan poredak bio je pod sve većim pritiskom, deformiran ekonomskim pritiscima odozdo i sve nepredvidljivijim pristupom vodstva odozgo.\n' +
    '\n' +
    'Iako je Putin uvijek određivao opći smjer politike, nekada je bio spreman saslušati različite ideje o tome kako to učinkovito provoditi. Sada se to više čini kao opasna igra pogađanja jer dužnosnici moraju predvidjeti što on želi čuti.\n' +
    '\n' +
    'Iako današnji Putin odbija angažirati se u potencijalno teškim ili neugodnim političkim pitanjima, i danas postaje nestrpljiv kada se ona ne riješe. On zahtijeva "patriotizam", ali ne uspijeva objasniti što to znači. Zatvara oči pred propustima i nevjerojatnom korupcijom nekih pojedinaca, ali istovremeno okrutno kažnjava neke druge zbog istog.\n' +
    '\n' +
    'Zato je smrt Starovojta toliko šokirala njegove kolege iz insajderskih krugova - to se svakome od njih moglo dogoditi i samo zahvaljujući Putinovoj milosti nisu na njegovu mjestu.\n' +
    '\n' +
    'Povratak metodama iz 90-ih\n' +
    'Niz nedavnih samoubojstava ruskih dužnosnika, a posebno poslovnih ljudi, izazvao je veliku globalnu pozornost, ali i sumnju. Neke od tih smrti nesumnjivo su doista bile samoubojstva, ali postoje dobri razlozi za vjerovati da neke druge nisu.\n' +
    '\n' +
    'Ipak, unatoč tvrdnjama da se radi o nekoj vrsti čistke u Kremlju, vjerojatno se događalo nešto drugo. Putin za ubojstvom poseže uglavnom kada su u pitanju disidenti i oni koje smatra izdajnicima u inozemstvu. Kod kuće se oslanja prvenstveno na svoju kontrolu nad pravosudnim sustavom - u kleptokraciji se uvijek može pronaći dovoljno dokaza za demonstracijsko suđenje, dugu kaznu u kažnjeničkoj koloniji i oduzimanje nezakonito stečene imovine.';
export const seedBlogs = async () => {
    try {

        const users = await User.find();

        if (users.length === 0) {
            console.log('No users found to assign blogs');
            return;
        }

        const blogs = [
            {
                title: 'Što novo o Putinu otkriva smrt bivšeg ministra? Vraćaju se metode iz 90-ih godina...',
                category: 'politics',
                image: 'https://cdn.cfr.org/sites/default/files/styles/full_width_xl/public/image/2025/06/Image%20TG%20UPB%202%20-%20Putin%27s%20Ambition_0.webp',
                content: blogContent,
                author: users[0]._id,
            },
            {
                title: 'Instagramom su zavladali trendovi u uređenju balkona i terasa - jedan nas je oduševio!',
                category: 'work',
                image: 'https://media.jutarnji.hr/images/slike/2025/06/17/m_37014970_1280.jpg',
                content: blogContent,
                author: users[0]._id,
            },
            {
                title: 'Navijači Hajduka najviše se plaše jedne stvari, a oko bivšeg Vatrenog nema nikakve dvojbe - on treba Bijelima',
                category: 'sports',
                image: 'https://media.jutarnji.hr/images/slike/2025/07/13/f_37162439_1280.jpg',
                content: blogContent,
                author: users[0]._id,
            },
            {
                title: 'NATO priprema golemu simulaciju odgovora na rusku invaziju, sudjeluje stotine tisuća, ulice pune tenkova: ‘Prijetnja je stvarna‘',
                category: 'politics',
                image: 'https://kamenjar.com/wp-content/uploads/2025/03/Mark-Rutte-NATO-848x477.jpg',
                content: blogContent,
                author: users[1]._id,
            },
            {
                title: 'Bivši košarkaški reprezentativac: ‘Nepravdu nikad nisam podnosio, ali znao sam je maknuti od sebe‘',
                category: 'sports',
                image: 'https://media.jutarnji.hr/images/slike/2025/07/08/f_25264753_1280.jpg',
                content: blogContent,
                author: users[1]._id,
            },
            {
                title: '‘Nevidljive‘ registarske pločice: Vozači ‘provalili‘ trik kojim uspješno izbjegavaju policijske kamere',
                category: 'work',
                image: 'https://media.jutarnji.hr/images/slike/2025/07/12/f_32436259_1280.jpg',
                content: blogContent,
                author: users[2]._id,
            },

        ];

        await Blog.insertMany(blogs);
        console.log('Blogs seeded!');
    } catch (error) {
        console.error('Error seeding blogs:', error);
    }
};
