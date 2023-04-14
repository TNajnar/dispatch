import { useContext } from "react";
import { KeycloakContext } from "../helpers/KeycloakContext";

const HomePage = () => {
  const { keycloakValue } = useContext(KeycloakContext);

  return (
    <div>
      <div className="text-center text-h1 font-bold">
        Vítej {keycloakValue?.idTokenParsed?.preferred_username}
      </div>
      <h1 className="text-h2 font-bold pb-6">Orientační pokyny k používání aplikace</h1>
      <h3 className="text-h3 font-bold">Management vozů</h3>
      <p className="pb-6">
        Zde můžeš libovolně skládat vlaky a přenášet vozy z jedné koleje na druhou. Tyto data
        se následně přepisují do Exportu dat, kde můžeš data vyexportovat do formátu Excel.
      </p>
      <h3 className="text-h3 font-bold">Odstavené vozy</h3>
      <p className="pb-6">
        V této záložce můžeš vytvářet koleje nebo místa, kde se právě nachází nějaké soupravy.
        Můžeš zde také přetahovat vozy a lokomotivy mezi jednotlivými místy.
      </p>
      <h3 className="text-h3 font-bold">Export dat</h3>
      <p>
        Zde exportuj tabulku do CSV(.csv) nebo Excel(.xlsx) souboru. Lze doplnit i kontakt na
        strojvedoucího a odkud kam vlak jede.
      </p>
      <h3 className="text-h3 font-bold">Zvol si tema</h3>
      <p>
        Pomocí přepínače v levém horním rohu si můžeš navolit mód. Jsou k dispozici světlý a
        tmavý mód.
      </p>
    </div>
  );
};

export default HomePage;
