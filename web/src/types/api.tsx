import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
  uuid: any;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "games" */
export type Games = {
  __typename?: 'games';
  contract?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  creator: Scalars['String'];
  id: Scalars['uuid'];
  /** An array relationship */
  players: Array<Players>;
  /** An aggregated array relationship */
  players_aggregate: Players_Aggregate;
  updated_at?: Maybe<Scalars['timestamptz']>;
};


/** columns and relationships of "games" */
export type GamesPlayersArgs = {
  distinct_on?: Maybe<Array<Players_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Players_Order_By>>;
  where?: Maybe<Players_Bool_Exp>;
};


/** columns and relationships of "games" */
export type GamesPlayers_AggregateArgs = {
  distinct_on?: Maybe<Array<Players_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Players_Order_By>>;
  where?: Maybe<Players_Bool_Exp>;
};

/** aggregated selection of "games" */
export type Games_Aggregate = {
  __typename?: 'games_aggregate';
  aggregate?: Maybe<Games_Aggregate_Fields>;
  nodes: Array<Games>;
};

/** aggregate fields of "games" */
export type Games_Aggregate_Fields = {
  __typename?: 'games_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Games_Max_Fields>;
  min?: Maybe<Games_Min_Fields>;
};


/** aggregate fields of "games" */
export type Games_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Games_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "games" */
export type Games_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Games_Max_Order_By>;
  min?: Maybe<Games_Min_Order_By>;
};

/** input type for inserting array relation for remote table "games" */
export type Games_Arr_Rel_Insert_Input = {
  data: Array<Games_Insert_Input>;
  on_conflict?: Maybe<Games_On_Conflict>;
};

/** Boolean expression to filter rows from the table "games". All fields are combined with a logical 'AND'. */
export type Games_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Games_Bool_Exp>>>;
  _not?: Maybe<Games_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Games_Bool_Exp>>>;
  contract?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  creator?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  players?: Maybe<Players_Bool_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "games" */
export enum Games_Constraint {
  /** unique or primary key constraint */
  GamesContractKey = 'games_contract_key',
  /** unique or primary key constraint */
  GamesCreatorKey = 'games_creator_key',
  /** unique or primary key constraint */
  GamesPkey = 'games_pkey'
}

/** input type for inserting data into table "games" */
export type Games_Insert_Input = {
  contract?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  creator?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  players?: Maybe<Players_Arr_Rel_Insert_Input>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Games_Max_Fields = {
  __typename?: 'games_max_fields';
  contract?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  creator?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "games" */
export type Games_Max_Order_By = {
  contract?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  creator?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Games_Min_Fields = {
  __typename?: 'games_min_fields';
  contract?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  creator?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "games" */
export type Games_Min_Order_By = {
  contract?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  creator?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "games" */
export type Games_Mutation_Response = {
  __typename?: 'games_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Games>;
};

/** input type for inserting object relation for remote table "games" */
export type Games_Obj_Rel_Insert_Input = {
  data: Games_Insert_Input;
  on_conflict?: Maybe<Games_On_Conflict>;
};

/** on conflict condition type for table "games" */
export type Games_On_Conflict = {
  constraint: Games_Constraint;
  update_columns: Array<Games_Update_Column>;
  where?: Maybe<Games_Bool_Exp>;
};

/** ordering options when selecting data from "games" */
export type Games_Order_By = {
  contract?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  creator?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  players_aggregate?: Maybe<Players_Aggregate_Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "games" */
export type Games_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "games" */
export enum Games_Select_Column {
  /** column name */
  Contract = 'contract',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Creator = 'creator',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "games" */
export type Games_Set_Input = {
  contract?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  creator?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "games" */
export enum Games_Update_Column {
  /** column name */
  Contract = 'contract',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Creator = 'creator',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "games" */
  delete_games?: Maybe<Games_Mutation_Response>;
  /** delete single row from the table: "games" */
  delete_games_by_pk?: Maybe<Games>;
  /** delete data from the table: "players" */
  delete_players?: Maybe<Players_Mutation_Response>;
  /** delete single row from the table: "players" */
  delete_players_by_pk?: Maybe<Players>;
  /** insert data into the table: "games" */
  insert_games?: Maybe<Games_Mutation_Response>;
  /** insert a single row into the table: "games" */
  insert_games_one?: Maybe<Games>;
  /** insert data into the table: "players" */
  insert_players?: Maybe<Players_Mutation_Response>;
  /** insert a single row into the table: "players" */
  insert_players_one?: Maybe<Players>;
  /** update data of the table: "games" */
  update_games?: Maybe<Games_Mutation_Response>;
  /** update single row of the table: "games" */
  update_games_by_pk?: Maybe<Games>;
  /** update data of the table: "players" */
  update_players?: Maybe<Players_Mutation_Response>;
  /** update single row of the table: "players" */
  update_players_by_pk?: Maybe<Players>;
};


/** mutation root */
export type Mutation_RootDelete_GamesArgs = {
  where: Games_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Games_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_PlayersArgs = {
  where: Players_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Players_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_GamesArgs = {
  objects: Array<Games_Insert_Input>;
  on_conflict?: Maybe<Games_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Games_OneArgs = {
  object: Games_Insert_Input;
  on_conflict?: Maybe<Games_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PlayersArgs = {
  objects: Array<Players_Insert_Input>;
  on_conflict?: Maybe<Players_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Players_OneArgs = {
  object: Players_Insert_Input;
  on_conflict?: Maybe<Players_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_GamesArgs = {
  _set?: Maybe<Games_Set_Input>;
  where: Games_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Games_By_PkArgs = {
  _set?: Maybe<Games_Set_Input>;
  pk_columns: Games_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_PlayersArgs = {
  _inc?: Maybe<Players_Inc_Input>;
  _set?: Maybe<Players_Set_Input>;
  where: Players_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Players_By_PkArgs = {
  _inc?: Maybe<Players_Inc_Input>;
  _set?: Maybe<Players_Set_Input>;
  pk_columns: Players_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "players" */
export type Players = {
  __typename?: 'players';
  address: Scalars['String'];
  created_at?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  game: Games;
  game_id: Scalars['uuid'];
  id: Scalars['uuid'];
  nickname: Scalars['String'];
  score?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregated selection of "players" */
export type Players_Aggregate = {
  __typename?: 'players_aggregate';
  aggregate?: Maybe<Players_Aggregate_Fields>;
  nodes: Array<Players>;
};

/** aggregate fields of "players" */
export type Players_Aggregate_Fields = {
  __typename?: 'players_aggregate_fields';
  avg?: Maybe<Players_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Players_Max_Fields>;
  min?: Maybe<Players_Min_Fields>;
  stddev?: Maybe<Players_Stddev_Fields>;
  stddev_pop?: Maybe<Players_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Players_Stddev_Samp_Fields>;
  sum?: Maybe<Players_Sum_Fields>;
  var_pop?: Maybe<Players_Var_Pop_Fields>;
  var_samp?: Maybe<Players_Var_Samp_Fields>;
  variance?: Maybe<Players_Variance_Fields>;
};


/** aggregate fields of "players" */
export type Players_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Players_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "players" */
export type Players_Aggregate_Order_By = {
  avg?: Maybe<Players_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Players_Max_Order_By>;
  min?: Maybe<Players_Min_Order_By>;
  stddev?: Maybe<Players_Stddev_Order_By>;
  stddev_pop?: Maybe<Players_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Players_Stddev_Samp_Order_By>;
  sum?: Maybe<Players_Sum_Order_By>;
  var_pop?: Maybe<Players_Var_Pop_Order_By>;
  var_samp?: Maybe<Players_Var_Samp_Order_By>;
  variance?: Maybe<Players_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "players" */
export type Players_Arr_Rel_Insert_Input = {
  data: Array<Players_Insert_Input>;
  on_conflict?: Maybe<Players_On_Conflict>;
};

/** aggregate avg on columns */
export type Players_Avg_Fields = {
  __typename?: 'players_avg_fields';
  score?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "players" */
export type Players_Avg_Order_By = {
  score?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "players". All fields are combined with a logical 'AND'. */
export type Players_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Players_Bool_Exp>>>;
  _not?: Maybe<Players_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Players_Bool_Exp>>>;
  address?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  game?: Maybe<Games_Bool_Exp>;
  game_id?: Maybe<Uuid_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  nickname?: Maybe<String_Comparison_Exp>;
  score?: Maybe<Int_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "players" */
export enum Players_Constraint {
  /** unique or primary key constraint */
  PlayersPkey = 'players_pkey'
}

/** input type for incrementing integer column in table "players" */
export type Players_Inc_Input = {
  score?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "players" */
export type Players_Insert_Input = {
  address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  game?: Maybe<Games_Obj_Rel_Insert_Input>;
  game_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  nickname?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Players_Max_Fields = {
  __typename?: 'players_max_fields';
  address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  game_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  nickname?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "players" */
export type Players_Max_Order_By = {
  address?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  game_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  nickname?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Players_Min_Fields = {
  __typename?: 'players_min_fields';
  address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  game_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  nickname?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "players" */
export type Players_Min_Order_By = {
  address?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  game_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  nickname?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "players" */
export type Players_Mutation_Response = {
  __typename?: 'players_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Players>;
};

/** input type for inserting object relation for remote table "players" */
export type Players_Obj_Rel_Insert_Input = {
  data: Players_Insert_Input;
  on_conflict?: Maybe<Players_On_Conflict>;
};

/** on conflict condition type for table "players" */
export type Players_On_Conflict = {
  constraint: Players_Constraint;
  update_columns: Array<Players_Update_Column>;
  where?: Maybe<Players_Bool_Exp>;
};

/** ordering options when selecting data from "players" */
export type Players_Order_By = {
  address?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  game?: Maybe<Games_Order_By>;
  game_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  nickname?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "players" */
export type Players_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "players" */
export enum Players_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GameId = 'game_id',
  /** column name */
  Id = 'id',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  Score = 'score',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "players" */
export type Players_Set_Input = {
  address?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  game_id?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  nickname?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Players_Stddev_Fields = {
  __typename?: 'players_stddev_fields';
  score?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "players" */
export type Players_Stddev_Order_By = {
  score?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Players_Stddev_Pop_Fields = {
  __typename?: 'players_stddev_pop_fields';
  score?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "players" */
export type Players_Stddev_Pop_Order_By = {
  score?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Players_Stddev_Samp_Fields = {
  __typename?: 'players_stddev_samp_fields';
  score?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "players" */
export type Players_Stddev_Samp_Order_By = {
  score?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Players_Sum_Fields = {
  __typename?: 'players_sum_fields';
  score?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "players" */
export type Players_Sum_Order_By = {
  score?: Maybe<Order_By>;
};

/** update columns of table "players" */
export enum Players_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  GameId = 'game_id',
  /** column name */
  Id = 'id',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  Score = 'score',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Players_Var_Pop_Fields = {
  __typename?: 'players_var_pop_fields';
  score?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "players" */
export type Players_Var_Pop_Order_By = {
  score?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Players_Var_Samp_Fields = {
  __typename?: 'players_var_samp_fields';
  score?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "players" */
export type Players_Var_Samp_Order_By = {
  score?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Players_Variance_Fields = {
  __typename?: 'players_variance_fields';
  score?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "players" */
export type Players_Variance_Order_By = {
  score?: Maybe<Order_By>;
};

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "games" */
  games: Array<Games>;
  /** fetch aggregated fields from the table: "games" */
  games_aggregate: Games_Aggregate;
  /** fetch data from the table: "games" using primary key columns */
  games_by_pk?: Maybe<Games>;
  /** fetch data from the table: "players" */
  players: Array<Players>;
  /** fetch aggregated fields from the table: "players" */
  players_aggregate: Players_Aggregate;
  /** fetch data from the table: "players" using primary key columns */
  players_by_pk?: Maybe<Players>;
};


/** query root */
export type Query_RootGamesArgs = {
  distinct_on?: Maybe<Array<Games_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Games_Order_By>>;
  where?: Maybe<Games_Bool_Exp>;
};


/** query root */
export type Query_RootGames_AggregateArgs = {
  distinct_on?: Maybe<Array<Games_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Games_Order_By>>;
  where?: Maybe<Games_Bool_Exp>;
};


/** query root */
export type Query_RootGames_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootPlayersArgs = {
  distinct_on?: Maybe<Array<Players_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Players_Order_By>>;
  where?: Maybe<Players_Bool_Exp>;
};


/** query root */
export type Query_RootPlayers_AggregateArgs = {
  distinct_on?: Maybe<Array<Players_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Players_Order_By>>;
  where?: Maybe<Players_Bool_Exp>;
};


/** query root */
export type Query_RootPlayers_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "games" */
  games: Array<Games>;
  /** fetch aggregated fields from the table: "games" */
  games_aggregate: Games_Aggregate;
  /** fetch data from the table: "games" using primary key columns */
  games_by_pk?: Maybe<Games>;
  /** fetch data from the table: "players" */
  players: Array<Players>;
  /** fetch aggregated fields from the table: "players" */
  players_aggregate: Players_Aggregate;
  /** fetch data from the table: "players" using primary key columns */
  players_by_pk?: Maybe<Players>;
};


/** subscription root */
export type Subscription_RootGamesArgs = {
  distinct_on?: Maybe<Array<Games_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Games_Order_By>>;
  where?: Maybe<Games_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGames_AggregateArgs = {
  distinct_on?: Maybe<Array<Games_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Games_Order_By>>;
  where?: Maybe<Games_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGames_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootPlayersArgs = {
  distinct_on?: Maybe<Array<Players_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Players_Order_By>>;
  where?: Maybe<Players_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPlayers_AggregateArgs = {
  distinct_on?: Maybe<Array<Players_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Players_Order_By>>;
  where?: Maybe<Players_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPlayers_By_PkArgs = {
  id: Scalars['uuid'];
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type CreateGameMutationVariables = Exact<{
  gameObject: Games_Insert_Input;
}>;


export type CreateGameMutation = (
  { __typename?: 'mutation_root' }
  & { insert_games_one?: Maybe<(
    { __typename?: 'games' }
    & Pick<Games, 'id'>
  )> }
);

export type GameQueryVariables = Exact<{
  gameId: Scalars['uuid'];
}>;


export type GameQuery = (
  { __typename?: 'query_root' }
  & { games_by_pk?: Maybe<(
    { __typename?: 'games' }
    & Pick<Games, 'id' | 'creator' | 'contract'>
  )> }
);

export type CreatePlayerMutationVariables = Exact<{
  playerObject: Players_Insert_Input;
}>;


export type CreatePlayerMutation = (
  { __typename?: 'mutation_root' }
  & { insert_players_one?: Maybe<(
    { __typename?: 'players' }
    & Pick<Players, 'id'>
  )> }
);

export type GamePlayersSubscriptionVariables = Exact<{
  gameId: Scalars['uuid'];
}>;


export type GamePlayersSubscription = (
  { __typename?: 'subscription_root' }
  & { players: Array<(
    { __typename?: 'players' }
    & Pick<Players, 'id' | 'nickname' | 'address'>
  )> }
);

export type PlayerScoreSubscriptionVariables = Exact<{
  playerId: Scalars['uuid'];
}>;


export type PlayerScoreSubscription = (
  { __typename?: 'subscription_root' }
  & { players_by_pk?: Maybe<(
    { __typename?: 'players' }
    & Pick<Players, 'id' | 'score'>
  )> }
);


export const CreateGameDocument = gql`
    mutation CreateGame($gameObject: games_insert_input!) {
  insert_games_one(object: $gameObject) {
    id
  }
}
    `;

export function useCreateGameMutation() {
  return Urql.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument);
};
export const GameDocument = gql`
    query Game($gameId: uuid!) {
  games_by_pk(id: $gameId) {
    id
    creator
    contract
  }
}
    `;

export function useGameQuery(options: Omit<Urql.UseQueryArgs<GameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GameQuery>({ query: GameDocument, ...options });
};
export const CreatePlayerDocument = gql`
    mutation CreatePlayer($playerObject: players_insert_input!) {
  insert_players_one(object: $playerObject) {
    id
  }
}
    `;

export function useCreatePlayerMutation() {
  return Urql.useMutation<CreatePlayerMutation, CreatePlayerMutationVariables>(CreatePlayerDocument);
};
export const GamePlayersDocument = gql`
    subscription GamePlayers($gameId: uuid!) {
  players(where: {game_id: {_eq: $gameId}}) {
    id
    nickname
    address
  }
}
    `;

export function useGamePlayersSubscription<TData = GamePlayersSubscription>(options: Omit<Urql.UseSubscriptionArgs<GamePlayersSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<GamePlayersSubscription, TData>) {
  return Urql.useSubscription<GamePlayersSubscription, TData, GamePlayersSubscriptionVariables>({ query: GamePlayersDocument, ...options }, handler);
};
export const PlayerScoreDocument = gql`
    subscription PlayerScore($playerId: uuid!) {
  players_by_pk(id: $playerId) {
    id
    score
  }
}
    `;

export function usePlayerScoreSubscription<TData = PlayerScoreSubscription>(options: Omit<Urql.UseSubscriptionArgs<PlayerScoreSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<PlayerScoreSubscription, TData>) {
  return Urql.useSubscription<PlayerScoreSubscription, TData, PlayerScoreSubscriptionVariables>({ query: PlayerScoreDocument, ...options }, handler);
};