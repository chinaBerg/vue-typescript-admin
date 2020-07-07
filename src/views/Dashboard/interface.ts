/** 新建/编辑文件夹弹窗的类型 */
export type RobotDialogType = 'create' | 'edit';

/** 新建/编辑文件夹弹窗参数 */
export type RobotDialog = {
  type: RobotDialogType;
  data: any;
  visible: boolean;
};
