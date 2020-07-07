export default [
  {
    name: 'ControllerCenter', // 控制中心
    auths: {},
    children: [
      {
        name: 'ControllerSurvey', // 概况
        auths: {
          // 无权限不返回key
          add: 1, // 权限1
          edit: 1, // 权限2
          // ...
        },
      },
      { name: 'ControllerTaskMonitoring' }, // 任务监控
      { name: 'ControllerTeamProcess' }, // 团队流程
      { name: 'ControllerSchedulingPlan' }, // 调度计划
      { name: 'ControllerTrigger' }, // 触发器
      { name: 'ControllerRobot' }, // 机器人
      { name: 'ControllerLog' }, // 日志
      { name: 'ControllerSet' }, // 设置
    ],
  },
  {
    name: 'DevelopCenter', // 开发中心
    children: [
      { name: 'DevelopPersonalProcess' }, // 我参与的流程
      { name: 'DevelopSet' }, // 设置
    ],
  },
  {
    name: 'Workplace', // 工作区
    children: [
      { name: 'WorkplacePersonalRobot' }, // 我的机器人
      { name: 'WorkplacePersonalProcess' }, // 我的流程
      { name: 'WorkplaceSchedulingPlan' }, // 调度计划
      { name: 'WorkplaceTrigger' }, // 触发器
      { name: 'WorkplaceSet' }, // 设置
    ],
  },
];
