export class Constants {
  // コレクション名
  static readonly COLLECTION_TARGET = 'targets' // ターゲットコレクション
  static readonly COLLECTION_ACTUALS = 'actuals' // 実績コレクション
  static readonly TASK_COLLECTION = 'tasks' // タスクコレクション
  static readonly COLLECTION_USER = 'users' // ユーザーコレクション

  // フィールド名
  static readonly COLUMN_OWNER_ID = 'ownerId' // 所有者ID
  static readonly COLUMN_CREATED_AT = 'createdAt' // 作成日時
  static readonly COLUMN_STUDY_DATE = 'studyDate' // 日付
  static readonly COLUMN_STATUS = 'status' // ステータス
  static readonly COLUMN_TARGET_ID = 'targetId' // ターゲットID
  static readonly COLUMN_TASK_ID = 'taskId' // タスクID

  // クエリパラメータ
  static readonly WHERE_EQUAL = '==' // 等しい比較
  static readonly WHERE_GREATER_EQUAL = '>=' // 以上
  static readonly WHERE_LESS_EQUAL = '<=' // 以下
  static readonly ORDERBY_DESC = 'desc' // 降順ソート
  static readonly ORDERBY_ASC = 'asc' // 昇順ソート

  // リミット値
  static readonly RECENT_TARGETS_LIMIT = 3 // 最近のターゲットのリミット

  // 定数
  static readonly DAYS_OF_WEEK = ['日', '月', '火', '水', '木', '金', '土']
}
