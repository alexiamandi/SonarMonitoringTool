package com.sonar;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import alex.iamandi.SonarMonitoringTool.Instance;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;


/**
 * QInstance is a Querydsl query type for Instance
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QInstance extends EntityPathBase<Instance> {

    private static final long serialVersionUID = 1526316301L;

    public static final QInstance instance = new QInstance("instance");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath link = createString("link");

    public QInstance(String variable) {
        super(Instance.class, forVariable(variable));
    }

    public QInstance(Path<? extends Instance> path) {
        super(path.getType(), path.getMetadata());
    }

    public QInstance(PathMetadata<?> metadata) {
        super(Instance.class, metadata);
    }

}

