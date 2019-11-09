# Scanbage

Progetto di **applicazioni e servizi web**.

*Scanbage* è una piattaforma online con l'obiettivo di sensibilizzare e di aiutare gli utenti nel riciclo dei rifiuti, esponendo le seguenti funzionalità:

1. riconoscimento della tipologia di rifiuto attraverso l'inserimento di una foto;
2. creazioni di case *virtuali* nelle quali, un gruppo di utenti, possano avere uno storico dei rifiuti gettati, il bidone corrispondente ad ogni rifiuto e delle statistiche per effettuare confronti tra utenti della stessa casa;
3. elementi di *gamification* come: possibilità di acquisire premi, avanzamento nei livelli, visualizzazione di una classifica globale,...

Una versione stabile del sito, si trova al seguente link: https://www.scanbage.ml/

## Deployment

In seguito, una sequenza di comandi, per impostare il progetto, in ambienti linux:

```
./install.sh
./build.sh
./run.sh
```

in ambiente windows, è possibile impostare il progetto con i seguenti comandi:

```
cd .\backend\; npm start; cd..
cd .\frontend\; npm install; npm run build; cd ..
cd .\backend\; npm start;

```

Il servizio web, verrà avviato alla porta 3000.



## Autori

- Simone Letizi
- Marta Luffarelli
- Andrea Petreti
- Gianluca Aguzzi

