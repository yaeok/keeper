export class Utilities {
  // 日本時間で現在時刻を取得
  static getJSTDate(): Date {
    return new Date(
      new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
    )
  }

  // 指定された文字列日付を日本時間のDate型に変換
  static convertStringToDate(date: string): Date {
    return new Date(
      new Date(date).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
    )
  }

  // 年/月/日それぞれを受け取り、日本時間のDate型に変換
  static convertYMDToDate(year: number, month: number, day: number): Date {
    return new Date(
      new Date(year, month - 1, day).toLocaleString('ja-JP', {
        timeZone: 'Asia/Tokyo',
      })
    )
  }
}
