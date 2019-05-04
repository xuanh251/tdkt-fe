// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ApiOriginUrl: 'localhost:3000',
  apiUrl: 'http://localhost:3000/api/',
  AppName: 'HỆ THỐNG QUẢN LÍ THI ĐUA KHEN THƯỞNG TRƯỜNG ĐẠI HỌC QUẢNG NAM',
  dataTableLanguage: {
    'sProcessing':    'Đang tải...',
    'sLengthMenu':    'Hiển thị _MENU_ bản ghi trên 1 trang',
    'sZeroRecords':   'Không có dữ liệu',
    'sEmptyTable':    'Không có dữ liệu',
    'sInfo':          'Dữ liệu hiển thị từ _START_ đến _END_ trong tổng số _TOTAL_ bản ghi',
    'sInfoEmpty':     'Dữ liệu hiển thị từ 0 đến 0 trong tổng số 0 bản ghi',
    'sInfoFiltered':  '(Dữ liệu lọc trong tổng số _MAX_ bản ghi)',
    'sInfoPostFix':   '',
    'sSearch':        'Tìm kiếm:',
    'sUrl':           '',
    'sInfoThousands':  ',',
    'sLoadingRecords': 'Đang tải...',
    'oPaginate': {
        'sFirst':    'Đầu',
        'sLast':    'Cuối',
        'sNext':    'Tiếp',
        'sPrevious': 'Trước'
    },
    'oAria': {
        'sSortAscending':  ': Đang chọn lọc dữ liệu xuôi',
        'sSortDescending': ': Đang chọn lọc dữ liệu ngược'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
