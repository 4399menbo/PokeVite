export interface PokemonType {
    name: string;
    url: string;
}

export interface Types {
    slot: Number;
    type: Type;
}

export interface Type {
    name: String;
    url: String;
}

export interface Stats {
    base_stat: Number;
    effort: Number;
    stat: Stat;
}

export interface Stat {
    name: string;
    url: string;
}