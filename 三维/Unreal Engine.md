# Unreal Engine

在UE中添加各类三维数据，基本是不需要编写C++代码的（自身支持+各类插件实现），但后续进一步涉及到数据交互时，就需要手动编写C++代码，需要进一步研究学习

## 1. UE + Cesium

利用【Cesium for Unreal】插件实现在UE中使用相关cesium数据集及3dtiles支持

- 直接加载Cesium自带资产（world terrain, osm, bing map, 光照sunsky...）https://blog.csdn.net/ChaoChao66666/article/details/131419239?spm=1001.2014.3001.5501
- 直接使用上传至【Cesium ion】中的各类资产，如3dtiles
  - https://blog.csdn.net/weixin_52555766/article/details/134930508?spm=1001.2101.3001.6650.11&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-11-134930508-blog-127807779.235%5Ev43%5Epc_blog_bottom_relevance_base5&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-11-134930508-blog-127807779.235%5Ev43%5Epc_blog_bottom_relevance_base5&utm_relevant_index=16 
  -  https://blog.csdn.net/ChaoChao66666/article/details/131422754?spm=1001.2014.3001.5501
- 直接加载本地的3dtiles资产：https://blog.csdn.net/ChaoChao66666/article/details/131423417

- 地形与影像数据：可直接加载利用【Cesiumlab】等工具进行切片处理并发布后的数据（注：影像数据仅支持TMS，可以在切片时手动设置）
  - https://zhuanlan.zhihu.com/p/377441753
  - https://zhuanlan.zhihu.com/p/539068209?utm_id=0

对于需要加载WMTS的情况（如天地图），需要自定义编译打包【Cesium for Unreal】插件源码实现，需要比较好的C++能力：https://mp.weixin.qq.com/s/mIkwktvPe0Y2inHHXb-XOA



## 2. DataSmith

【Datasmith】是一系列工具和插件的集合，可以将使用各种行业标准设计应用创建的完整预构建场景和复杂资源导入虚幻引擎

- 下载各类建模软件用于导出**.udatasmith**的插件（https://www.unrealengine.com/zh-CN/datasmith/plugins），所有Datasmith支持的软件和文件类型（https://docs.unrealengine.com/5.3/zh-CN/datasmith-supported-software-and-file-types/），例如以下：
  - 3DS MAX
  - Sketchup Pro
  - Revit
  - Rhino
  - IFC
  - Solidworks/Catia等

- 使用【DataSmith Importer】插件导入 **.udatasmith** 文件
  - 文档：https://docs.unrealengine.com/5.3/zh-CN/datasmith-tutorials-in-unreal-engine/



## 3. 加载倾斜摄影

加载倾斜摄影的方式有很多，主要有 1）转为3dtiles利用【Cesium for Unreal】插件；2）转为fbx再直接导入UE

对于方式2：OpenSceneGraph提供的格式转换工具osgconv.exe【osgconv】支持命令行方式的osgb转fbx

```sh
$ osgconv input.osgb output.fbx 
```

但倾斜摄影往往包含大量osgb文件，可以采用以下python代码写一个批处理脚本

```python
import glob
 
osgPath = r'D:\work\OpenSceneGraph-3.6.5-VC2019-64-Release\bin'
infile = ""
for p1 in glob.glob('*'):
    if(-1 != p1.find(".osgb")):
        infile = infile + p1 + " "
cmdBat = "osgconv.exe " + infile+"../model/1.fbx"
file_path = 'data.bat'
with open(file_path, mode='w', encoding='ANSI') as file_obj:
    file_obj.write('set path='+osgPath+'\n')
    file_obj.write(cmdBat)
    file_obj.write('\npause')
```

参考文章：https://blog.csdn.net/g0415shenw/article/details/124583011



## 4. LiDAR支持

UE中有各种点云插件用于导入导出、可视化及编辑点云，官方文档中介绍的是【LiDAR Point Cloud Support】

该插件支持最常用的点云数据格式 **las**，也有 **xyz，pts，txt**

官方文档中对LiDAR点云插件使用的说明：https://docs.unrealengine.com/5.3/zh-CN/lidar-point-cloud-plugin-for-unreal-engine/



## 5. gltf支持

UE支持直接将gltf导入为资产，官方文档：https://docs.unrealengine.com/5.3/zh-CN/the-gl-transmission-format-gltf-in-unreal-engine/

