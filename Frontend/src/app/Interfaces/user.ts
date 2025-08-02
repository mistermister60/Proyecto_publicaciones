export interface User{
    ctipou?: number;
    descripcion?: string;
    estado?: string;
  }


export interface colonia {
  Id_Col?: number | null;
  Det_col?: string | null;
  Estado?: string | null;
}

export interface direccionlugar {
  Id_Dr?: number | null;
  col_dl?: string | null;
  num_dl?: string | null;
  Id_Col?: number | null;
  Estado?: string | null;
}

export interface servicio {
  Id_serv?: number | null;
  Det_sev?: string | null;
  Estado?: string | null;
}

export interface usuario {
  Id_usu?: number | null;
  Ma_usu?: string | null;
  Nom_usu?: string | null;
  Pes_usu?: string | null;
  Nac_usu?: Date | string | null;
  Ban_usu?: boolean | null;
  Reponsable_usu?: boolean | null;
  Estado?: string | null;
  id_per?: number | null; // <-- nuevo campo
}

export interface perfilusuario {
  id_per?: number | null;
  des_per?: string | null;
  estado?: string | null;
}

export interface empresa {
  Id_emp?: number | null;
  Nom_emp?: string | null;
  Mail_Emp?: string | null;
  Pas_emp?: string | null;
  Id_Dil?: number | null;
  Id_Serv?: number | null;
  Estado?: string | null;
}

export interface perfilempresa {
  Id_pemp?: number | null;
  Inf_pemp?: string | null;
  des_pemp?: string | null;
  Id_emp?: number | null;
  Estado?: string | null;
}

export interface publicacionempresa {
  Id_pube?: number | null;
  Det_pube?: string | null;
  Id_emp?: number | null;
  Estado?: string | null;
}

export interface publicacion {
  Id_Pub?: number | null;
  Id_usu?: number | null;
  Det_pub?: string | null;
  Id_emp?: number | null;
  Estado?: string | null;
}